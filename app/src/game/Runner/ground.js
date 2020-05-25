// @ts-check
/// <reference path='./index.d.ts'/>
import defaultImg from './images/ground.png'
import Sprite from './sprite'

class Ground extends Sprite {
    /**
     * object config
     * @type {{IMG_SRC: Array | string, X_POS: number, Y_POS: number, GROUND_HEIGHT: number}}
     */
    config = {
        /** @type {Array | string} */
        IMG_SRC: defaultImg,
        X_POS: 0,
        Y_POS: 0,
        GROUND_HEIGHT: 20,
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs Ground
     */
    constructor(canvas, options = {}) {
        super(canvas, options)
        this.config = {
            ...this.config,
            ...options,
        }
        this.xPos = this.config.X_POS || 0
        this.groundY =
            this.config.Y_POS ||
            this.canvas.height - this.img.height - this.config.GROUND_HEIGHT
        this.yPos = this.groundY
    }

    /**
     * @param {number} [deltaTime = 1 / 16]
     * @param {number} [speed = 0]
     */
    update(deltaTime = 1 / 16, speed = 1) {
        this.xPos -= (speed * deltaTime ) / 3
        super.update()
    }
}

export default Ground
