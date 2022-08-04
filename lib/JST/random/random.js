
import { isNumber } from "../native/typeCheck.js";
import MersenneTwister from "./mersenne-twister.js";


/** Access to random number generator
 *
 *  Automatically uses MersenneTwister if it is available else using Math.random instead
 */

let currentSeed = -1;
let generator = null;

/** @returns {number} */
const getNext = () => generator.random();

/** @returns {number} */
const getSeed = () => currentSeed;

const useBuiltInGenerator = () => {
    currentSeed = -1;
    generator = Math;
};

/** @param {number | null} seed */
const useMersenneTwister = (seed = null) => {
    currentSeed = (isNumber(seed)) ? seed : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    generator = new MersenneTwister(seed);
};

/** @param {number | null} seed */
const initGenerator = (seed = null) => {
    if (typeof MersenneTwister !== "undefined") {
        useMersenneTwister(seed);
    } else {
        useBuiltInGenerator();
    }
};

initGenerator();


export {
    getNext,
    getSeed,
    initGenerator,
    useBuiltInGenerator,
    useMersenneTwister
};
