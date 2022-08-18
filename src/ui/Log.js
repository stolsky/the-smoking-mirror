
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import { getText, getTextAsArray } from "../core/translate.js";

import Wrapper from "./Wrapper.js";


const Log = class extends Wrapper {

    constructor() {
        super("Log");
    }

    /**
     * @param {string} narrator
     * @param {string} messages
     */
    #addMessage(narrator, text) {

        const messageContainer = new Container("Message");

        const fullName = getText(narrator);
        if (isNotEmptyString(fullName)) {
            messageContainer.addComponent(new TextComponent(fullName, "Narrator"));
        }

        // TODO improve display of text
        getTextAsArray(text).forEach((line) => messageContainer.addComponent(new TextComponent(line, "Text")));
        this.addComponent(messageContainer, 0);
        messageContainer.view();
    }

    /** @param {Array<{text:string, narrtor: string}>} messages */
    append(messages) {
        if (messages instanceof Array) {
            messages.forEach(({ narrator, text }) => this.#addMessage(narrator, text));
        }
    }

};


export default Log;
