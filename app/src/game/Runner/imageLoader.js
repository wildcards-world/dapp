// @ts-check
/// <reference path='./index.d.ts'/>
import tRexImg from './images/gorilla-frame.png' //jump
import tRexFistFrameImg from './images/gorilla-frame.png'
import tRexDuck1Img from './images/gorilla-running-1.png'
import tRexDuck2Img from './images/gorilla-running-2.png'
import tRexCrashImg from './images/gorilla-dead.png'

import cloudImg from './images/vine-small.png'
import groundImg from './images/ground.png'
import cactusSmallImg from './images/plant-short-large.png'
import cactusLargeImg from './images/plant-tall-large.png'
import restartButtonImg from './images/restart_button.png'
import gameoverTextImg from './images/gameover_text.png'
import scoreNumberImg from './images/score_number.png'

/**
 * URL to load
 * @type {string[]} img url array
 */
const imageArray = [
    cloudImg,
    tRexImg,
    tRexFistFrameImg,
    groundImg,
    cactusSmallImg,
    cactusLargeImg,
    tRexDuck1Img,
    tRexDuck2Img,
    tRexCrashImg,
    restartButtonImg,
    gameoverTextImg,
    scoreNumberImg,
]

/**
 * @type {Map<string, HTMLImageElement>}
 */
const imageMap = new Map()

/**
 * @type {promise[]}
 */
const promiseArray = imageArray.map(imgUrl => {
    const promise = new Promise((resolve, reject) => {
        const img = new Image()
        img.onerror = reject
        img.onload = () => {
            imageMap.set(imgUrl, img)
            resolve()
        }
        img.src = imgUrl
    })
    return promise
})

export function loadImages() {
    return Promise.all(promiseArray)
}

/**
 * load img from imageMap
 * @param {string} src img src
 * @return {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap}
 */
export default function getImg(src) {
    const img = imageMap.get(src)
    if (!img) {
        throw new Error(`load image fail! IMG_SRC: ${src}`)
    }
    return img
}
