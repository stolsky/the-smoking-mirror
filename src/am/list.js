
import { isNotEmptyString } from "../../lib/JST/native/type_check.js";


const List = class {

    #elements;

    #active;

    #hasElement = (id) => isNotEmptyString(id) && this.#elements.includes(id);

    constructor() {
        this.#elements = [];
        this.#active = null;
    }

    /** @param {string} id */
    add(id) {
        if (isNotEmptyString(id) && !this.#hasElement(id)) {
            this.#elements.push(id);
        }
    }

    /** @param {string} id */
    setActive(id) {
        if (this.#hasElement(id)) {
            this.#active = id;
        }
    }

    getActive() {
        return this.#active;
    }

    clear() {
        this.#active = null;
        this.#elements = [];
    }

};


export default List;
