
import { getNext } from "../../lib/JST/random/random.js";


const Combination = class {

    /** @type {Array<Element | Hero | Item>} */
    #elements;

    /** @type {Element | Hero | Item} */
    #lock;

    /** @type {Element | Hero | Item} */
    #key;

    #success;

    #add(element) {

        if (this.#key || Combination.#isLock(element)) {
            this.#lock = element;
        } else {
            this.#key = element;
        }

        return { id: element.getId(), highlight: true };
    }

    #init() {
        this.#elements = [];
        this.#lock = null;
        this.#key = null;
        this.#success = false;
    }

    static #isLock(element) {
        return element.getCombinations() instanceof Array;
    }

    constructor() {
        this.#init();
    }

    cancel() {

        const deselect = [];
        if (this.#lock) {
            deselect.push(this.#lock);
        }
        if (this.#key) {
            deselect.push(this.#key);
        }

        this.#init();

        return deselect.map((element) => ({ id: element.getId(), highlight: false }));
    }

    /** @returns {{text?: string, stmt?: Array<string>}} */
    check(element) {

        let result = this.#add(element);

        if (this.#lock && this.#key) {
            const combinations = this.#lock.getCombinations();
            if (combinations instanceof Array) {
                for (let i = 0; i < combinations.length; i = i + 1) {
                    const { id, text, stmt } = combinations[`${i}`];
                    if (this.#key.getId() === id) {
                        this.#success = true;
                        result = { text, stmt };
                        break;
                    }
                }
            }

            if (!result.text || !result.stmt) {
                result = { text: `georgeWrong${Math.floor(getNext() * 12)}` };
            }

        }

        return result;
    }

    isActive() {
        return (this.#lock || this.#key) !== null;
    }

    wasSuccessful() {
        return this.#success;
    }

};


export default new Combination();
