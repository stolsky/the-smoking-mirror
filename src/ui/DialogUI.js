
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import getWord from "../core/translate.js";
import CollectionManager from "./CollectionManager.js";

import Wrapper from "./Wrapper.js";


const DialogUI = class extends Wrapper {

    /** @type {Container} */
    #conversation;

    /** @type {CollectionManager} */
    #topics;

    static TYPE = Object.freeze({
        SPEECH: "Speech", // default
        SOUND: "Sound",
        THOUGHT: "Thought"
    });

    static POSITION = Object.freeze({
        LEFT: "AlignLeft",
        CENTER: "AlignCenter", // default
        RIGHT: "AlignRight"
    });

    constructor() {

        super("Dialog Maximize");

        this.#conversation = new Container("Conversation");
        this.#topics = new CollectionManager("Topics");

        this.append(
            new Container("Wrapper").append(
                this.#conversation,
                new TextComponent(getWord("clickToContinue"), "Hint")
            ),
            this.#topics
        );

        this.addListener();
    }

    clearDialog() {
        this.#conversation.clear();
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

        const name = (isNotEmptyString(nameID)) ? getWord(nameID) : "";
        const text = (isNotEmptyString(textID)) ? getWord(textID) : "";
        const className = (Object.values(DialogUI.TYPE).includes(type)) ? type : DialogUI.TYPE.SPEECH;
        const align = (Object.values(DialogUI.POSITION).includes(position)) ? position : DialogUI.POSITION.CENTER;

        this.#conversation.addComponent(new Container(`${className} ${align}`).append(
            new TextComponent(name, "Person"),
            new TextComponent(text, "Message")
        ));

        return this;
    }

    updateTopics(topics) {
        this.#topics.updateElements(topics);
        // TODO add default close button
        return this;
    }

};


export default DialogUI;
