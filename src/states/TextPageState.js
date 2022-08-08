
import { EventType } from "../../lib/JST/native/typeCheck.js";

import TextPage from "../ui/TextPage.js";

import GameStatesManager from "./GameStatesManager.js";


const TextPageState = class {

    #toRender;

    /** @type {TextPage} */
    #wrapper;

    constructor(properties) {

        const { className, title, text } = properties;

        this.#wrapper = new TextPage(className)
            .setTitle(title)
            .setText(text)
            .setHint("clickToContinue")
            .addEventListener(EventType.mouseup, () => GameStatesManager.notify("done"));

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        this.#wrapper.clear().remove();
        this.#wrapper = null;
        this.#toRender = false;
    }

    /** @param {Container} ctx */
    render(ctx) {
        if (this.#toRender) {
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        // calculate animation
        return this;
    }

};


export default TextPageState;
