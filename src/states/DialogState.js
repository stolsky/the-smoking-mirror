
import InputEventManager from "../core/InputEventManager.js";
import processClick from "../core/processClick.js";

import DialogUI from "../ui/DialogUI.js";

import GameCache from "../am/GameCache.js";


const DialogState = class {

    #dialog;

    /** @type {Array} */
    #updateMessages;

    /** @type {Array} */
    #updateTopics;

    #toRender;

    #wrapper;

    #getNextPart() {

    }

    #handleInput({ id, buttons }) {
        // this.#processChanges(processClick({
        //     element: id,
        //     buttons
        // }));
    }

    constructor(dialog) {

        this.#dialog = (GameCache.hasItem(dialog)) ? GameCache.getItem(dialog) : null;

        this.#updateMessages = [];
        this.#updateTopics = [];

        this.#wrapper = new DialogUI();

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        return this;
    }

    render(ctx) {
        if (this.#toRender) {
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }

        if (this.#updateMessages.length > 0) {
            this.#wrapper.updateMessages(this.#updateMessages);
            this.#updateMessages = [];
        }

        if (this.#updateTopics.length > 0) {
            this.#wrapper.updateTopics(this.#updateTopics);
            this.#updateTopics = [];
        }
    }

    update() {
        const input = InputEventManager.getInputEvent();
        if (input) {
            this.#handleInput(input);
        }
    }

};


export default DialogState;
