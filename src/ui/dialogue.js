
import Container from "../../lib/JST/dom/container.js";

import Wrapper from "./wrapper.js";


const Dialogue = class extends Wrapper {

    /** @type {Container} */
    #dialogue;

    /** @type {Container} */
    #topics;

    static TYPE = Object.freeze({
        SPEECH: 0,
        SOUND: 1,
        THOUGHT: 2
    });

    constructor() {

        super("Dialogue");

        this.#dialogue = new Container("Box");
        this.#topics = new Container("Topics");

        this.append(
            this.#dialogue,
            this.#topics
        );

    }

    addMessage(name, text, type) {
        //this.#dialogue.addComponent();
        return this;
    }

};


export default Dialogue;
