
import { EventType } from "../../lib/JST/native/typeCheck.js";

import TextPage from "../ui/TextPage.js";

import GameStatesManager from "./GameStatesManager.js";


const TextPageState = class {

    #toRender;

    /** @type {TextPage} */
    #ui;

    /** @param {{name: string, title: string, text: string}} */
    constructor({ name, title, text }) {

        this.#ui = new TextPage(name)
            .setTitle(title)
            .setText(text)
            .setHint("clickToContinue")
            // TODO maybe use InputEventManager and fire notify in update method
            .addEventListener(EventType.mouseup, () => GameStatesManager.notify("done"));

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        this.#ui.clear().remove();
        this.#ui = null;
        this.#toRender = false;
    }

    render(ctx) {
        if (this.#toRender) {
            this.#ui.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        return this;
    }

};


export default TextPageState;
