
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import getWord, { getText } from "../core/translate.js";

import CollectionManager from "./CollectionManager.js";
import Wrapper from "./Wrapper.js";


const DialogUI = class extends Wrapper {

    /** @type {Container} */
    #conversation;

    /** @type {CollectionManager} */
    #topics;

    /** @type {TextComponent} */
    #hint;

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

    /**
     * @param {string} person
     * @param {string} text
     * @param {string} type
     * @param {string} align
     */
    #addBubble(person, text, type, align) {
        const bubble = new Container(`${type} ${align}`).append(
            new TextComponent(person, "Person"),
            new TextComponent(text, "Message")
        );
        this.#conversation.addComponent(bubble);
        bubble.view();
    }

    constructor() {

        super("Dialog Maximize");

        this.#conversation = new Container("Conversation");
        this.#topics = new CollectionManager("Topics");
        this.#hint = new TextComponent(getWord("clickToContinue"), "Hint");

        this.append(
            new Container("Wrapper").append(this.#conversation, this.#hint),
            this.#topics
        );

        this.addPointerListener();
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
        return this;
    }

    showTopics() {
        this.#topics.show();
        return this;
    }

    // TODO hide/show/clear/set Hint -> to specify current action in dialogue

    updateDialog({ nameID, textID, type, position }) {

        const person = getText(nameID);
        const text = getText(textID);
        const className = (Object.values(DialogUI.TYPE).includes(type)) ? type : DialogUI.TYPE.SPEECH;
        const align = (Object.values(DialogUI.POSITION).includes(position)) ? position : DialogUI.POSITION.CENTER;

        this.#addBubble(person, text, className, align);

        return this;
    }

    updateTopics(topics) {
        this.#topics.updateElements(topics);
        // TODO add default close button
        return this;
    }

};


export default DialogUI;
