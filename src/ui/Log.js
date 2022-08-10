
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import getWord from "../core/translate.js";

import Wrapper from "./Wrapper.js";


const Log = class extends Wrapper {

    constructor() {
        super("Log");
    }

    /** @param {Array<{text:string, narrtor: string}>} messages */
    append(messages) {
        if (messages instanceof Array) {
            messages.forEach(({ text, narrator }) => {
                if (isNotEmptyString(text)) {

                    const messageContainer = new Container("Message");

                    if (isNotEmptyString(narrator)) {
                        messageContainer.addComponent(new TextComponent(getWord(narrator), "Narrator"));
                    }

                    const finalizedText = text.split("+").map((part) => getWord(part)).join(" ");
                    messageContainer.addComponent(new TextComponent(finalizedText, "Text"));

                    this.addComponent(messageContainer, 0);

                    // TODO rewrite scroll up method
                    //Fx.scrollTop(container, 0);

                }
            });
        }
    }

};


export default Log;
