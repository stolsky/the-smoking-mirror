
import { hasProperty } from "../native/typeCheck.js";

// TODO extends Map??

const Cache = class {

    /** @type {{}} */
    #cache;

    constructor() {

        this.#cache = {};

    }

    /** @param {Cache} cache */
    append(cache) {
        if (cache instanceof Cache) {
            cache.getAllKeys().forEach((key) => {
                if (!this.hasItem(key)) {
                    this.setItem(key, cache.getItem(key));
                }
            });
        }
    }

    clear() {
        this.#cache = {};
    }

    deleteItem(key) {
        if (this.hasItem(key)) {
            delete this.#cache[encodeURIComponent(key)];
        }
    }

    filterValues(filterMethod) {
        return Object.values(this.#cache.filter(filterMethod));
    }

    getAllKeys() {
        return Object.keys(this.#cache);
    }

    getItem(key) {
        return (this.hasItem(key)) ? this.#cache[encodeURIComponent(key)] : null;
    }

    hasItem(key) {
        return hasProperty(this.#cache, encodeURIComponent(key));
    }

    setItem(key, value) {
        this.#cache[encodeURIComponent(key)] = value;
    }

};


export default Cache;
