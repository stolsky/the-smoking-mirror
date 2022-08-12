
import Container from "../../lib/JST/dom/Container.js";
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import Wrapper from "./Wrapper.js";


const Dialog = class extends Wrapper {

    /** @type {Container} */
    #dialog;

    /** @type {Container} */
    #topics;

    static TYPE = Object.freeze({
        SPEECH: 0, // default
        SOUND: 1,
        THOUGHT: 2
    });

    constructor() {

        super("Dialog");

        this.#dialog = new Container("Box");
        this.#topics = new Container("Topics");

        this.append(
            this.#dialog,
            this.#topics
        );

    }

    updateMessage(name, text, type) {

        // if (Object.values(Dialog.TYPES).includes(type)) {

        // } else {
        //     Dialog.TYPE.SPEECH
        // }
        
        return this;
    }

    updateTopics(topics) {
        
        return this;
    }

};


export default Dialog;
