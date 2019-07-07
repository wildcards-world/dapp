// @ts-check
/// <reference path='./index.d.ts'/>
import Sprite from './sprite'
import cactusSmallImg from './images/plant-short-large.png'
import cactusLargeImg from './images/plant-tall-large.png' 

class Obstacle extends Sprite {
    /** @type {number} */
    groundY

    /**
     * object config
     * @type {{IMG_SRC: Array | string, X_POS: number, Y_POS: number, GROUND_HEIGHT: number}}
     */
    config = {
        IMG_SRC: [cactusSmallImg, cactusLargeImg],
        X_POS: 0,
        Y_POS: 0,
        GROUND_HEIGHT: 20,
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs Obstacle
     */
    constructor(canvas, options = {}) {
        super(canvas, options)
        this.config = {
            ...this.config,
            ...options,
        }
        this.xPos = this.config.X_POS || 0
        if (this.config.Y_POS && this.config.GROUND_HEIGHT) {
            throw new Error(
                'options \'Y_POS\' and \'GROUND_HEIGHT\' exist simultaneously'
            )
        }
        this.groundY =
            this.canvas.height - this.img.height - this.config.GROUND_HEIGHT
        this.yPos = this.config.Y_POS || this.groundY
    }

    /**
     * update the obstacle position
     * @param {number} [deltaTime = 1 / 16]
     * @param {number} [speed=0]
     */
    update(deltaTime = 1 / 16, speed = 0) {
        this.xPos -= speed * deltaTime
        super.update()
    }
}

export default Obstacle
