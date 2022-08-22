
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

        // TODO improve display of text
        getTextAsArray(text).forEach((line) => {
            if (isNotEmptyString(line)) {
                messageContainer.addComponent(new TextComponent(line, "Text"));
            }
        });

        if (messageContainer.getChildren().length > 0) {
            const fullName = getText(narrator);
            if (isNotEmptyString(fullName)) {
                messageContainer.addComponent(new TextComponent(fullName, "Narrator"), 0);
            }
            this.addComponent(messageContainer, 0);
            messageContainer.view();
        }
    }

    /** @param {Array<{text:string, narrtor: string}>} messages */
    append(messages) {
        // console.log(messages);
        if (messages instanceof Array) {
            messages.forEach(({ narrator, text }) => this.#addMessage(narrator, text));
        }
    }

};


export default Log;
