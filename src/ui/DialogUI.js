
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

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

    /**
     * @param {string} person
     * @param {string} text
     * @param {string} type
     * @param {string} align
     */
    #addBubble(person, text, type, align) {
        this.#conversation.addComponent(new Container(`${type} ${align}`).append(
            new TextComponent(person, "Person"),
            new TextComponent(text, "Message")
        ));
    }

    constructor() {

        super("Dialog Maximize");

        this.#conversation = new Container("Conversation");
        this.#topics = new CollectionManager("Topics");

        this.append(
            new Container("Wrapper").append(
                this.#conversation,
                new TextComponent(Wrapper.finalizeWord("clickToContinue"), "Hint")
            ),
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

    updateDialog({ nameID, textID, type, position }) {

        const person = Wrapper.finalizeName(nameID);
        const text = Wrapper.finalizeText(textID);
        const className = (Object.values(DialogUI.TYPE).includes(type)) ? type : DialogUI.TYPE.SPEECH;
        const align = (Object.values(DialogUI.POSITION).includes(position)) ? position : DialogUI.POSITION.CENTER;

        // TODO add click event for each bubble -> in DialogState
        text.forEach((line) => this.#addBubble(person, line, className, align));

        return this;
    }

    updateTopics(topics) {
        this.#topics.updateElements(topics);
        // TODO add default close button
        return this;
    }

};


export default DialogUI;
