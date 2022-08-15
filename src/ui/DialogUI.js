
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import getWord from "../core/translate.js";
import CollectionManager from "./CollectionManager.js";

import Wrapper from "./Wrapper.js";


const DialogUI = class extends Wrapper {

    /** @type {Container} */
    #dialog;

    /** @type {CollectionManager} */
    #topics;

    static TYPE = Object.freeze({
        SPEECH: "Speech", // default
        SOUND: "Sound",
        THOUGHT: "Thought"
    });

    static POSITION = Object.freeze({
        LEFT: "left",
        CENTER: "center",
        RIGHT: "right"
    });

    constructor() {

        super("Dialog Maximize");

        this.#dialog = new Container("Conversation");
        this.#topics = new CollectionManager("Topics");

        // TODO add default close button

        this.append(
            this.#dialog,
            this.#topics
        );

        this.addListener();
    }

    clearDialog() {
        this.#dialog.clear();
        return this;
    }

    clearTopics() {
        this.#topics.clear();
        return this;
    }

    hideTopics() {
        this.#topics.hide();
    }

    showTopics() {
        this.#topics.show();
    }

    updateDialog({ nameID = "", textID = "", type = DialogUI.TYPE.SPEECH, position = "left" }) {

        const name = (isNotEmptyString(nameID)) ? getWord(nameID) : "";
        const text = (isNotEmptyString(textID)) ? getWord(textID) : "";
        const className = (Object.values(DialogUI.TYPES).includes(type)) ? type : DialogUI.TYPE.SPEECH;
        const textAlign = (Object.values(DialogUI.POSITION).includes(position)) ? position : DialogUI.POSITION.CENTER;

        this.#dialog.addComponent(new Container(className).append(
            new TextComponent(name, "Person"),
            new TextComponent(text, "Message")
        ).setStyle("text-align", textAlign));

        return this;
    }

    updateTopics(topics) {
        this.#topics.updateElements(topics);
        return this;
    }

};


export default DialogUI;
