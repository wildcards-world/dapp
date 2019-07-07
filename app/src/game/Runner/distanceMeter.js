import scoreNumberImg from './images/score_number.png'
import loadImg from './imageLoader'

class DistanceMeter {
    /** @type {!HTMLCanvasElement} */
    canvas
    /** @type {!CanvasRenderingContext2D} */
    get canvasCtx() {
        return this.canvas.getContext('2d')
    }
    /** @type {number} */
    highestScore = 0
    /** @type {number} */
    score = 0
    /** @type {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap} */
    img

    config = {
        IMG_SRC: scoreNumberImg,
        RATIO: 0.05,
        // Number of digits.
        MAX_DISTANCE_UNITS: 5,
        DIGIT_WIDTH: 10,
        DIGIT_HEIGHT: 13,
        DIGIT_DEST_WIDTH: 11,
        Y_POS: 0,
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs DistanceMeter
     */
    constructor(canvas, options = {}) {
        this.canvas = canvas
        this.config = {
            ...this.config,
            ...options,
        }
        this.img = loadImg(this.config.IMG_SRC)
    }

    /**
     * update score
     * @param {number} num score
     */
    update(num) {
        this.score = Math.floor(num * this.config.RATIO)
        this.draw()
    }

    updateHighScore() {
        if (this.score > this.highestScore) {
            this.highestScore = this.score
        }
        this.draw()
    }

    /**
     * draw score on (x, y)
     * @param {number | string} score
     * @param {number} x xPos
     * @param {number} y yPos
     */
    drawScore(score = 0, x = 0, y = 0) {
        const scoreStr = score
            .toString()
            .padStart(this.config.MAX_DISTANCE_UNITS, '0')
        const sourceY = 0

        this.canvasCtx.save()
        this.canvasCtx.globalAlpha = 0.8
        for (let i = 0; i < scoreStr.length; i++) {
            const c = scoreStr[i]
            const val = Number.parseInt(c)
            const sourceX = this.config.DIGIT_WIDTH * val
            this.canvasCtx.drawImage(
                this.img,
                sourceX,
                sourceY,
                this.config.DIGIT_WIDTH,
                this.config.DIGIT_HEIGHT,
                x + i * this.config.DIGIT_DEST_WIDTH,
                y,
                this.config.DIGIT_WIDTH,
                this.config.DIGIT_HEIGHT
            )
        }
        this.canvasCtx.restore()
    }

    /**
     * draw 'HI' on (x, y)
     * @param {number} x xPos
     * @param {number} y yPos
     */
    drawHi(x, y) {
        const sourceY = 0
        this.canvasCtx.save()
        this.canvasCtx.globalAlpha = 0.8
        for (let i = 10; i < 11; i++) {
            const sourceX = this.config.DIGIT_WIDTH * i
            this.canvasCtx.drawImage(
                this.img,
                sourceX,
                sourceY,
                this.config.DIGIT_WIDTH * 2,
                this.config.DIGIT_HEIGHT,
                x,
                y,
                this.config.DIGIT_WIDTH * 2,
                this.config.DIGIT_HEIGHT
            )
        }
        this.canvasCtx.restore()
    }

    drawHightestScore(score, x = 0, y = 0) {
        this.drawHi(x, y)
        this.drawScore(score, x + 2 * this.config.DIGIT_DEST_WIDTH, y)
    }

    draw() {
        // overflow
        if (this.score.toString().length > this.config.MAX_DISTANCE_UNITS) {
            this.score = 10 ** this.config.MAX_DISTANCE_UNITS - 1
        }
        const scoreWidth =
            this.config.DIGIT_DEST_WIDTH * this.config.MAX_DISTANCE_UNITS
        const highestScoreWidth = scoreWidth + this.config.DIGIT_DEST_WIDTH * 2
        if (this.highestScore > 0) {
            this.drawHightestScore(
                this.highestScore,
                this.canvas.width - (highestScoreWidth + scoreWidth + this.config.DIGIT_DEST_WIDTH),
                this.config.Y_POS
            )
        }
        this.drawScore(this.score, this.canvas.width - scoreWidth, this.config.Y_POS)
    }

    reset() {
        this.highestScore = 0
    }
}

export default DistanceMeter
