
import {hasProperty, isString} from "./js_tools.js";

export const Cache = class {

    constructor () {

        this.cache = {};

    }

    hasItem (key) {
        return hasProperty(this.cache, encodeURIComponent(key));
    }

    setItem (key, value) {
        if (isString(key)) {
            this.cache[encodeURIComponent(key)] = value;
        }
    }

    getItem (key) {
        return (this.hasItem(key)) ? this.cache[encodeURIComponent(key)] : null;
    }

    deleteItem (key) {
        if (this.hasItem(key)) {
            delete this.cache[encodeURIComponent(key)];
        }
    }

    clear () {
        this.cache = {};
    }

};
