
import Container from "../../lib/JST/dom/container.js";

import Wrapper from "./wrapper.js";


const Dialog = class extends Wrapper {

    /** @type {Container} */
    #dialog;

    /** @type {Container} */
    #topics;

    static TYPE = Object.freeze({
        SPEECH: 0,
        SOUND: 1,
        THOUGHT: 2
    });

    constructor() {

        super("Dialog");

        this.#dialog = new Container("Box");
        this.#topics = new Container("Topics");

        this.append(
            this.#dialog,
            this.#topics
        );

    }

    addMessage(name, text, type) {
        //this.#dialog.addComponent();
        return this;
    }

    // TODO set action to show next part of dialog -> time delay or mouse/key event

};


export default Dialog;
