
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
        CENTER: "center", // default
        RIGHT: "right"
    });

    constructor() {

        super("Dialog Maximize");

        this.#dialog = new Container("Conversation");
        this.#topics = new CollectionManager("Topics");

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

    updateDialog({ nameID, textID, type, position }) {

        console.log(nameID, textID, type, position);

        const name = (isNotEmptyString(nameID)) ? getWord(nameID) : "";
        const text = (isNotEmptyString(textID)) ? getWord(textID) : "";
        const className = (Object.values(DialogUI.TYPE).includes(type)) ? type : DialogUI.TYPE.SPEECH;
        const textAlign = (Object.values(DialogUI.POSITION).includes(position)) ? position : DialogUI.POSITION.CENTER;

        console.log(name, text, className, textAlign);

        this.#dialog.addComponent(new Container(className).append(
            new TextComponent(name, "Person"),
            new TextComponent(text, "Message")
        ).setStyle("text-align", textAlign));

        return this;
    }

    updateTopics(topics) {
        this.#topics.updateElements(topics);
        // TODO add default close button
        return this;
    }

};


export default DialogUI;
