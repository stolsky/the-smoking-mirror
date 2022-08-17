
import { EventType, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import InputEventManager from "../core/InputEventManager.js";
import { processCommands } from "../core/processClick.js";

import DialogUI from "../ui/DialogUI.js";

import GameCache from "../am/GameCache.js";


const DialogState = class {

    #isFadingIn;

    #current;

    /** @type {Array} */
    #updateMessages;

    /** @type {Array} */
    #updateTopics;

    #toRender;

    #ui;

    #processResult(result) {

        if (result instanceof Array) {
            // this.#ui.updateTopics(topics);
            // this.#ui.showTopics();
        } else if (result instanceof Object) {
            const { char, text, type, cmd } = result;
            // TODO check for hero and set position
            const position = DialogUI.POSITION.LEFT;
            this.#ui.updateDialog({ nameID: char, textID: text, type, position });
            if (cmd) {
                // TODO process command results
                console.log(processCommands(cmd));
            }
            this.#ui.hideTopics();
        }

    }

    #handleInput({ id, buttons }) {
        if (isNotEmptyString(id)) {
            this.#current = GameCache.getItem(id);
        }
        this.#processResult(this.#current.getAction({ left: true }));
    }

    constructor(startDialog) {

        this.#current = GameCache.getItem(startDialog);
        console.log(this.#current);

        this.#updateMessages = [];
        this.#updateTopics = [];

        this.#ui = new DialogUI()
            .addEventListener(
                EventType.animationend,
                () => {
                    this.#isFadingIn = false;
                    console.log("animation ended");
                },
                { once: true }
            );

        this.#processResult(this.#current.getAction({ left: true }));

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
            this.#ui.render(ctx);
            this.#toRender = false;
        }

        if (this.#updateMessages.length > 0) {
            this.#ui.updateMessages(this.#updateMessages);
            this.#updateMessages = [];
        }

        if (this.#updateTopics.length > 0) {
            this.#ui.updateTopics(this.#updateTopics);
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
