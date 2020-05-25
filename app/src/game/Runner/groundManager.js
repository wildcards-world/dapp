import { random } from 'lodash'

import Ground from './ground'
import Obstacle from './obstacle'

class GroundManager {
    /** @type {!HTMLCanvasElement} */
    canvas
    /** @type {!CanvasRenderingContext2D} */
    canvasCtx
    /** @type {Ground[]} */
    groundList = []
    /** @type {Ground[]} */
    lastGround = []
    /** @type {Obstacle[]} */
    obstacleList = []
    /** @type {number} */
    gameTime = 0
    /** @type {number} */
    currentGap = 0
    /** @type {{BUFFER_TIME: number, GROUND_CONFIG: object, MAX_OBSTACLE_GAP: number, MIN_OBSTACLE_GAP: number, OBSTACLE_CONFIG: object}} */
    config = {
        BUFFER_TIME: 2, //no obstacles time(second) when game start
        GROUND_CONFIG: {},
        MAX_OBSTACLE_GAP: 0,
        MIN_OBSTACLE_GAP: 0,
        OBSTACLE_CONFIG: {
            X_POS: 0,
        },
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs GroundManager
     */
    constructor(canvas, options = {}) {
        if (!canvas) {
            throw new Error('the parameter canvas is required!')
        }
        this.canvas = canvas
        this.canvasCtx = this.canvas.getContext('2d')

        this.config = {
            ...this.config,
            ...options,
        }

        this.config.OBSTACLE_CONFIG.X_POS = this.canvas.width
        this.config.MAX_OBSTACLE_GAP = this.canvas.width * 2
        this.config.MIN_OBSTACLE_GAP = this.canvas.width * 0.75
    }

    /**
     * @param {number} deltaTime
     * @param {number} speed
     */
    update(deltaTime, speed) {
        this.gameTime += deltaTime
        this.currentGap -= deltaTime * speed
        // ground
        this.groundList = this.groundList.filter(
            ground => ground && !ground.remove
        )
        this.groundList.forEach(ground => ground.update(deltaTime, speed))
        // add ground
        while (
            !this.lastGround ||
            this.lastGround.xPos + this.lastGround.img.width <=
                this.canvas.width
        ) {
            this.addGround(this.config.GROUND_CONFIG)
        }

        // obstacle
        if (this.needToAddObstacle()) {
            this.addObstacle(this.config.OBSTACLE_CONFIG)
        }
        this.obstacleList = this.obstacleList.filter(
            obstacle => obstacle && !obstacle.remove
        )
        this.obstacleList.forEach(obstacle => obstacle.update(deltaTime, speed))
    }

    /**
     * @param {object} [options={}]
     */
    addGround(options = {}) {
        const ground = new Ground(this.canvas, options)
        if (this.lastGround) {
            ground.xPos = this.lastGround.xPos + this.lastGround.img.width
        }
        this.groundList.push(ground)
        this.lastGround = ground
    }

    /**
     * @param {object} [options={}]
     */
    addObstacle(options = {}) {
        const obstacle = new Obstacle(this.canvas, options)
        this.obstacleList.push(obstacle)
        this.currentGap =
            this.canvas.width -
            obstacle.xPos +
            obstacle.img.width +
            random(this.config.MIN_OBSTACLE_GAP, this.config.MAX_OBSTACLE_GAP)
    }

    /**
     * @return {boolean}
     */
    needToAddObstacle() {
        if (this.gameTime < this.config.BUFFER_TIME) {
            return false
        }
        if (this.currentGap <= 0) {
            return true
        }
        return false
    }

    reset() {
        this.gameTime = 0
        this.groundList = []
        this.lastGround = null

        this.obstacleList = []
        this.currentGap = 0
    }
}

export default GroundManager
