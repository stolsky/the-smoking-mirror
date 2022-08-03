
import { isNotEmptyString } from "../../lib/JST/native/type_check.js";


const List = class {

    #elements;

    #hasElement = (id) => isNotEmptyString(id) && this.#elements.includes(id);

    constructor() {
        this.#elements = [];
    }

    /** @param {string} id */
    add(id) {
        if (!this.#hasElement(id)) {
            this.#elements.push(id);
        }
        return this;
    }

    remove(id) {
        if (this.#hasElement(id)) {
            const index = this.#elements.indexOf(id);
            this.#elements.splice(index, 1);
        }
        return this;
    }

    clear() {
        this.#elements = [];
        return this;
    }

};


export default List;
