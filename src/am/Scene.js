
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

    addAllElements(list) {
        if (list instanceof Array) {
            list.forEach((id) => this.addElement(id));
        }
        return this;
    }

    addElement(id = "elem") {
        if (!this.hasElement(id)) {
            this.#elements.push(id);
        }
        return this;
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
        return isString(id) && this.#elements.includes(id);
    }

    removeElement(id) {
        const index = this.#elements.indexOf(id);
        if (index !== -1) {
            this.#elements.splice(index, 1);
        }
    }

};


export default Scene;
