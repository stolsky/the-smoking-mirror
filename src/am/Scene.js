
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";


const Scene = class {

    #id;

    #name;

    #intro;

    /** @type {Array<string>} */
    #elements;

    #addAllElements(list) {
        if (list instanceof Array) {
            list.forEach((id) => this.#addElement(id));
        }
    }

    #addElement(id) {
        if (isNotEmptyString(id) && !this.hasElement(id)) {
            this.#elements.push(id);
        }
    }

    /** @param {{id: string, name: string, intro: string, elements: Array<string>}} */
    constructor({ id, name, intro, elements = [] } = {}) {

        this.#id = (isNotEmptyString(id)) ? `${id}` : "";
        this.#name = (isNotEmptyString(name)) ? `${name}` : "";
        this.#intro = (isNotEmptyString(intro)) ? `${intro}` : "";

        this.#elements = [];
        this.#addAllElements(elements);
    }

    /** @returns {Array<string>} */
    getAllElements() {
        return this.#elements;
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
        return this.#elements.includes(`${id}`);
    }

    removeElement(id) {
        const index = this.#elements.indexOf(`${id}`);
        if (index !== -1) {
            this.#elements.splice(index, 1);
        }
        return this;
    }

};


export default Scene;
