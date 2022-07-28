
import Random from "../random/random.js";


// creates random index from 0 to max
/** @param {number} max */
const randomIndex = (max) => Math.floor(Random.next() * max);

/** @param {Array} arr */
const shuffle = (arr) => {

    const temp = arr;
    let c = temp.length;
    let i = null;

    while (c > 0) {
        i = randomIndex(c);
        c = c - 1;
        [temp[c.valueOf()], temp[i.valueOf()]] = [temp[i.valueOf()], temp[c.valueOf()]];
    }

    return arr;
};


export default { shuffle };
