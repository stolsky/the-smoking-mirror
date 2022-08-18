
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";


const Inventory = class {

    /** @type {Array<string>} */
    #items;

    constructor() {
        this.#items = [];
    }

    /** @param {string} itemID */
    add(itemID) {
        if (isNotEmptyString(itemID) && !this.has(itemID)) {
            this.#items.push(itemID);
        }
        return this;
    }

    /** @param {Array<items>} items */
    addAll(items) {
        if (items instanceof Array) {
            items.forEach((item) => this.add(item));
        }
        return this;
    }

    getAll() {
        return this.#items;
    }

    has(itemID) {
        return this.#items.includes(itemID);
    }

};


export default Inventory;
