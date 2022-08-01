
import { getNext } from "../random/random.js";


// creates random index from 0 to max
/** @param {number} max */
const randomIndex = (max) => Math.floor(getNext() * max);

/** Shuffles the given array
 *
 * @param {Array} arr
 */
const shuffle = (arr) => {

    const temp = arr;
    let c = temp.length;
    let i = null;

    while (c > 0) {
        i = randomIndex(c);
        c = c - 1;
        [temp[c.valueOf()], temp[i.valueOf()]] = [temp[i.valueOf()], temp[c.valueOf()]];
    }

};


export default shuffle;
