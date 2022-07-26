
import { isNumber } from "../native/type_check.js";
import MersenneTwister from "./mersenne-twister.js";


/** access to random number generator
 *  automatically uses MersenneTwister if it is available else using Math.random instead
 */
const Random = (() => {

    const rnd = {};

    let s = -1;
    let g = null;

    /** @returns {number} */
    rnd.next = () => g.random();

    /** @returns {number} */
    rnd.seed = () => s;

    /** @param {number | null} seed */
    rnd.init = (seed = null) => {
        if (typeof MersenneTwister !== "undefined") {
            // Math.random() * Date.now() allows a random seed from 0 to Date.now (<1600000000000)
            s = (isNumber(seed)) ? seed : Math.floor(Math.random() * Date.now());
            g = new MersenneTwister(s);
        } else {
            s = -1;
            g = Math;
        }
    };

    return Object.freeze(rnd);

})();

Random.init();


export default Random;
