
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";


const Inventory = class {

    /** @type {Array<string>} */
    #items;

    /** @param {Array<string>} items */
    constructor(items = []) {
        this.#items = [];
        this.addAll(items);
    }

    /**
     * @param {string} itemID
     *
     * @returns {Inventory}
     */
    add(itemID) {
        if (isNotEmptyString(itemID) && !this.has(itemID)) {
            this.#items.push(itemID);
        }
        return this;
    }

    /**
     * @param {Array<string>} items
     *
     * @returns {Inventory}
     */
    addAll(items) {
        if (items instanceof Array) {
            items.forEach((item) => this.add(item));
        }
        return this;
    }

    getAll() {
        return this.#items;
    }

    /**
     * @param {string} itemID
     *
     * @returns {boolean}
     */
    has(itemID) {
        return this.#items.includes(`${itemID}`);
    }

    /**
     * @param {string} id
     *
     * @returns {Inventory}
     */
    remove(id) {
        const index = this.#items.indexOf(`${id}`);
        if (index !== -1) {
            this.#items.splice(index, 1);
        }
        return this;
    }

};


export default Inventory;
