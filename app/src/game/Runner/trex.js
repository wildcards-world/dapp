// @ts-check
/// <reference path='./index.d.ts'/>
import Sprite from './sprite'
import defaultTrexImg from './images/gorilla-frame.png'
import tRexFistFrameImg from './images/gorilla-frame.png'
import tRexDuck1Img from './images/gorilla-running-1.png'
import tRexDuck2Img from './images/gorilla-running-2.png'
import tRexCrashImg from './images/gorilla-dead.png'
import jumpSound from './sounds/button-press.mp3'
import hitSound from './sounds/hit.mp3'

/**
 * trex status enum
 * @readonly
 */
const STATUS = Object.freeze({
    START: 'START',
    JUMP: 'JUMP',
    DUCK_1: 'DUCK_1',
    DUCK_2: 'DUCK_2',
    CRASH: 'CRASH',
})

/**
 * @extends Sprite
 */
class Trex extends Sprite {
    /** @type {number} */
    jumpVelocity = 0
    /** @type {number} */
    groundY
    /** @type {string} */
    status
    /** @type {number} */
    duckTime = 0
    /** @type {Map<string, HTMLAudioElement>} */
    audioMap = new Map()

    /**
     * object config
     * @type {{IMG_SRC: Array | string, STATUS: object, DUCK_INTERVAL: number, X_POS: number, Y_POS: number, GROUND_HEIGHT: number, GRAVITY: number, JUMP_SPEED: number, SPEED: number, SOUNDS: object}}
     */
    config = {
        IMG_SRC: defaultTrexImg,
        STATUS: {
            START: { img: tRexFistFrameImg },
            JUMP: { img: defaultTrexImg },
            DUCK_1: { img: tRexDuck1Img },
            DUCK_2: { img: tRexDuck2Img },
            CRASH: { img: tRexCrashImg },
        },
        DUCK_INTERVAL: 0.1,
        X_POS: 20,
        Y_POS: 0,
        GROUND_HEIGHT: 20,
        GRAVITY: 1300,
        JUMP_SPEED: 700,
        SPEED: 100, // move when you start the game for the first time
        SOUNDS: {
            JUMP: jumpSound,
            HIT: hitSound,
        },
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} [options={}]
     * @constructs Trex
     */
    constructor(canvas, options = {}) {
        super(canvas, options)
        this.config = {
            ...this.config,
            ...options,
        }
        this.loadSounds()
        this.xPos = 0
        this.groundY =
            this.canvas.height - this.img.height - this.config.GROUND_HEIGHT
        this.yPos = this.config.Y_POS || this.groundY
        this.status = STATUS.START
    }

    /**
     * update position
     * @param {number} [deltaTime = 1 / 16]
     * @override
     */
    update(deltaTime = 1 / 16) {
        // move at the beginning of the first game
        if (this.status !== STATUS.JUMP && this.xPos < this.config.X_POS) {
            this.xPos += this.config.SPEED * deltaTime
            if (this.xPos > this.config.X_POS) {
                this.xPos = this.config.X_POS
            }
        }
        // jump
        if (this.status === STATUS.JUMP) {
            this.yPos -= this.jumpVelocity * deltaTime
            this.jumpVelocity -= this.config.GRAVITY * deltaTime
        }
        // Landing
        if (this.yPos > this.groundY) {
            this.yPos = this.groundY
            this.jumpVelocity = 0
            this.status = STATUS.DUCK_1
            this.duckTime = 0
        }
        // duck
        this.duckTime += deltaTime
        if (this.duckTime > this.config.DUCK_INTERVAL) {
            this.switchDuck()
            this.duckTime = 0
        }

        this.draw()
    }

    switchDuck() {
        if (this.status === STATUS.DUCK_1) {
            this.status = STATUS.DUCK_2
            return
        }
        if (this.status === STATUS.DUCK_2) {
            this.status = STATUS.DUCK_1
            return
        }
    }

    /**
     * @param {String | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap} [img = this.config.STATUS[this.status].img]
     * @override
     */
    draw(img = this.config.STATUS[this.status].img) {
        super.draw(img)
    }

    /**
     * @param {number} [speed=this.config.JUMP_SPEED]
     */
    jump(speed = this.config.JUMP_SPEED) {
        if (this.status === STATUS.JUMP || this.status === STATUS.CRASH) {
            return
        }
        this.status = STATUS.JUMP
        this.jumpVelocity = speed
        this.playSound(this.config.SOUNDS.JUMP)
    }

    crash() {
        this.status = STATUS.CRASH
        // landing
        this.jumpVelocity = -1 * Math.abs(this.jumpVelocity)
        this.playSound(this.config.SOUNDS.HIT)
    }

    start() {
        this.status = STATUS.JUMP
    }

    loadSounds() {
        Object.values(this.config.SOUNDS)
            .forEach(src => {
                const audio = new Audio(src)
                this.audioMap.set(src, audio)
            })
    }

    /**
     * play audio
     * @param {string} sound
     */
    playSound(sound) {
        const audio = this.audioMap.get(sound)
        // HTMLMediaElement.readyState
        if (!audio || audio.readyState !== 4) {
            return
        }
        audio.play()
    }
}

export default Trex
