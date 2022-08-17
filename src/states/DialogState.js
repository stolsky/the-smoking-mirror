
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import InputEventManager from "../core/InputEventManager.js";
import { processCommands } from "../core/processClick.js";

import GameCache, { getActiveHero } from "../am/GameCache.js";

import DialogUI from "../ui/DialogUI.js";

import GameStatesManager from "./GameStatesManager.js";


const DialogState = class {

    #current;

    #heroNameIDs;

    /** @type {Array} */
    #updateMessages;

    /** @type {Array} */
    #updateTopics;

    #toRender;

    #ui;

    #isCharacterHero(name) {
        return this.#heroNameIDs.includes(name);
    }

    #processResult(result) {

        if (result instanceof Array) {
            // this.#ui.updateTopics(topics);
            // this.#ui.showTopics();
        } else if (result instanceof Object) {

            const { char, text, type, cmd } = result;
            const isHero = this.#isCharacterHero(char);
            let position = DialogUI.POSITION.LEFT;

            if (type === DialogUI.TYPE.SOUND) {
                position = DialogUI.POSITION.CENTER;
            } else if (!isHero) {
                position = DialogUI.POSITION.RIGHT;
            }

            this.#ui.updateDialog({ nameID: char, textID: text, type, position });
            if (cmd) {
                // TODO process command results
                console.log("commands", ...processCommands(cmd));
            }

            this.#ui.hideTopics();
        }

    }

    #handleInput({ id, buttons }) {
        if (buttons.left) {
            if (isNotEmptyString(id)) {
                this.#current = GameCache.getItem(id);
            }
            //if (this.#current.isExplored()) {
                // this.#ui.hide(() => GameStatesManager.notify("done"));
            //} else {
                this.#current.isExplored();
                this.#processResult(this.#current.getAction({ left: buttons.left }));
            //}
        }
    }

    constructor(startDialog) {

        this.#current = GameCache.getItem(startDialog);
        this.#heroNameIDs = getActiveHero().getName();

        this.#updateMessages = [];
        this.#updateTopics = [];

        this.#ui = new DialogUI();

        this.#processResult(this.#current.getAction({ left: true }));

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        this.#current = null;
        this.#heroNameIDs = null;
        this.#updateMessages = null;
        this.#updateTopics = null;

        this.#toRender = false;
        this.#ui.clear().remove();
        this.#ui = null;
    }

    render(ctx) {
        if (this.#toRender) {
            this.#ui.render(ctx).show();
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
