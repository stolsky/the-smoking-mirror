
import { isString } from "../../lib/JST/native/typeCheck.js";


const Scene = class {

    #id;

    #name;

    #intro;

    /** @type {Array<string>} */
    #elements;

    /** @param {{id: string, name: string, intro: string, elements: Array<string>}} */
    constructor({ id, name, intro = null, elements = null }) {

        this.#id = (isString(id)) ? id : "scene";
        this.#name = (isString(name)) ? name : "Scene";
        this.#intro = intro;

        this.#elements = [];
        this.addAllElements(elements);
    }

    getId() {
        return this.#id;
    }

    getIntro() {
        return this.#intro;
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
