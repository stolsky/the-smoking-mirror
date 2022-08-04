
import { isString } from "../../lib/JST/native/typeCheck.js";


const Scene = class {

    #id;

    #name;

    /** @type {Array<string>} */
    #elements;

    /**
     * @param {string} id
     * @param {string} name
     * @param {Array<string>} elements
     */
    constructor(id, name, elements) {

        this.#id = (isString(id)) ? id : "scene";
        this.#name = (isString(name)) ? name : "Scene";

        this.#elements = [];
        this.addAllElements(elements);
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    hasElement(id) {
        return isString(id) && this.#elements.includes(id);
    }

    addElement(id = "elem") {
        if (!this.hasElement(id)) {
            this.#elements.push(id);
        }
    }

    addAllElements(list) {
        if (list instanceof Array) {
            list.forEach((id) => this.addElement(id));
        }
    }

    /** @returns {Array<string>} */
    getAllElements() {
        return this.#elements;
    }

};


export default Scene;
