
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Cache from "../../lib/JST/resource/Cache.js";

import Item from "./Item.js";


const Dialog = class {

    #prefix;

    #current;

    #parts;

    #loadCompleteDialog(dialogParts) {
        this.#parts = new Cache();
        dialogParts.forEach(({ id, name, states }) => {
            this.#parts.setItem(id, new Item(id, { name, states }));
        });
        this.#current = this.#parts.getItem(dialogParts[0].id);
    }

    /**
     * @param {string} id
     * @param {{ prefix?: string, states?: Array<string>}}
     */
    constructor(id = "dialog", { prefix, elems } = {}) {

        this.#prefix = (isNotEmptyString(prefix)) ? prefix : "";

        if (elems instanceof Array) {
            this.#loadCompleteDialog(elems);
        }

    }

    getNextLine() {
        const action = this.#current.getAction({ left: true });
        const text = action.text.split("+").map((id) => `${this.#prefix}${id}`).join("+");
        return { name: action.char, text };
    }

};


export default Dialog;
