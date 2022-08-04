import { isString } from "../../lib/JST/native/typeCheck.js";


const Inventory = class {

    #items;

    constructor(items = []) {

        /** @type {Array<string>} */
        this.#items = [];

        this.addAll(items);

    }

    /** @param {string} id */
    addItem(id) {
        if (isString(id)) {
            if (!this.hasItem(id)) {
                this.#items.push(id);
            }
        }
    }

    addAll(list) {
        if (list instanceof Array) {
            list.forEach((item) => this.addItem(item));
        }
    }

    getAll() {
        return this.#items;
    }

    /**
     * @param {string} id
     *
     * @returns {boolean}
     */
    hasItem(id) {
        return isString(id) && this.#items.includes(id);
    }

    removeItem(id) {
        if (this.hasItem(id)) {
            const index = this.#items.indexOf(id);
            this.#items.splice(index, 1);
        }
    }

};


export default Inventory;
