
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import { processCommands } from "../core/processClick.js";

import GameCache, { getActiveHero } from "../am/GameCache.js";

import DialogUI from "../ui/DialogUI.js";

import GameStatesManager from "./GameStatesManager.js";
import State from "./State.js";


const DialogState = class extends State {

    #current;

    #heroNameIDs;

    #isCharacterHero(name) {
        return this.#heroNameIDs.includes(name);
    }

    #processResult(result) {

        if (result instanceof Array) {
            // this.#ui.updateTopics(topics);
            // this.#ui.showTopics();
            // change hint to "click on a topic you want to discuss or exit the conversation"
        } else if (result instanceof Object) {

            const { char, text, type, cmd } = result;
            const isHero = this.#isCharacterHero(char);
            let position = DialogUI.POSITION.LEFT;

            if (type === DialogUI.TYPE.SOUND) {
                position = DialogUI.POSITION.CENTER;
            } else if (!isHero) {
                position = DialogUI.POSITION.RIGHT;
            }

            this.pushQueueData("dialog", { nameID: char, textID: text, type, position });
            if (cmd) {
                // TODO process command results if they are not empty -> show new topics, hide discussed ones
                const commands = processCommands(cmd);
                // console.log(...commands);
            }

            this.getUI().hideTopics();
            // change hint to "click anywhere to continue"
        }

    }

    #handleInut({ id, buttons }) {
        if (buttons.left) {
            if (isNotEmptyString(id)) {
                this.#current = GameCache.getItem(id);
            }
            // TODO check if also no options available
            if (this.#current.isExplored()) {
                this.startAnimation()
                    .getUI().hide(() => GameStatesManager.notify("done"));
            } else {
                this.#processResult(this.#current.getAction({ left: buttons.left }));
            }
        }
    }

    constructor(startDialog) {

        super();

        this.#current = GameCache.getItem(startDialog);
        this.#heroNameIDs = getActiveHero().getName();

        this.addDataQueue("dialog", "updateDialog")
            .addDataQueue("topics", "updateTopics")
            .setUI(new DialogUI().show())
            .setInputHandler(this.#handleInut);

        this.#processResult(this.#current.getAction({ left: true }));
    }


    /** @override */
    exit() {
        this.#current = null;
        this.#heroNameIDs = null;

        super.exit();
    }

    /** @override */
    update() {
        if (!this.isAnimationRunning()) {
            super.update();
        }
    }

};


export default DialogState;
