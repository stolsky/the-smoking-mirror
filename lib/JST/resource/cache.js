
import { hasProperty } from "../native/type_check.js";


const Cache = class {

    /** @type {{}} */
    #cache;

    constructor() {

        this.#cache = {};

    }

    hasItem(key) {
        return hasProperty(this.#cache, encodeURIComponent(key));
    }

    setItem(key, value) {
        this.#cache[encodeURIComponent(key)] = value;
    }

    getItem(key) {
        return (this.hasItem(key)) ? this.#cache[encodeURIComponent(key)] : null;
    }

    deleteItem(key) {
        if (this.hasItem(key)) {
            delete this.#cache[encodeURIComponent(key)];
        }
    }

    clear() {
        this.#cache = {};
    }

};


export default Cache;
