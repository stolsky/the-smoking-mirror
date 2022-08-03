
import { isNotEmptyString } from "../../lib/JST/native/type_check.js";


const StringList = class {

    /** @type {Array} */
    #elements;

    constructor(elements = []) {
        this.#elements = [];
        this.addAll(elements);
    }

    /** @param {string} element */
    add(element) {
        if (!this.has(element)) {
            this.#elements.push(element);
        }
        return this;
    }

    addAll(elements) {
        if (elements instanceof Array) {
            elements.forEach((element) => this.add(element));
        }
    }

    clear() {
        this.#elements = [];
        return this;
    }

    getAll() {
        return this.#elements;
    }

    has(element) {
        return isNotEmptyString(element) && this.#elements.includes(element);
    }

    remove(element) {
        if (this.has(element)) {
            const index = this.#elements.indexOf(element);
            this.#elements.splice(index, 1);
        }
        return this;
    }

};


export default StringList;
