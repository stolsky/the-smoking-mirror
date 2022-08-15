
import { hasProperty } from "../../lib/JST/native/typeCheck.js";
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

        return { element: element.getId(), highlight: true };
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

        return deselect.map((element) => ({ element: element.getId(), highlight: false }));
    }

    /** @returns {{text?: string, cmd?: Array<string>}} */
    check(element) {

        let result = this.#add(element);

        if (this.#lock && this.#key) {
            const combinations = this.#lock.getCombinations();
            if (combinations instanceof Array) {
                for (let i = 0; i < combinations.length; i = i + 1) {
                    const { id, text, cmd } = combinations[`${i}`];
                    if (this.#key.getId() === id) {
                        this.#success = true;
                        result = { text, cmd };
                        break;
                    }
                }
            }

            if (!hasProperty(result, "text") && !hasProperty(result, "cmd")) {
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
