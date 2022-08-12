
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Cache from "../../lib/JST/resource/Cache.js";

import Element from "./Element.js";


const Dialog = class {

    #id;

    #names;

    #prefix;

    #intro;

    #once;

    /** @type {Cache} */
    #options;

    #createOptions(options) {
        if (options instanceof Array) {
            options.forEach(({ id, name, states }) => {
                if (isNotEmptyString(id)) {
                    this.#options.setItem(id, new Element(id, name, states));
                }
            });
        }
    }

    constructor(id, { names, prefix, intro, elems } = {}) {

        this.#id = id;

        this.#options = new Cache();

        this.#names = names;
        this.#prefix = prefix;
        this.#intro = intro;

        this.#createOptions(elems);

    }

};


export default Dialog;
