
import Container from "../../lib/JST/dom/container.js";
import TextComponent from "../../lib/JST/dom/text_component.js";

import Wrapper from "./wrapper.js";


const Intro = class extends Wrapper {

    /** @type {TextComponent} */
    #title_container;

    /** @type {Container} */
    #text_container;

    /** @type {TextComponent} */
    #hint_container;

    constructor() {

        super("Intro Center");

        this.#title_container = new TextComponent(null, "Title");
        this.#text_container = new Container("Text");
        this.#hint_container = new TextComponent(null, "Hint");

        this.append(
            this.#title_container,
            this.#text_container,
            this.#hint_container
        );
    }

    setTitle(title) {
        this.#title_container.setText(title);
        return this;
    }

    setText(text) {
        text.split(";").forEach((part) => this.#text_container.addComponent(new TextComponent(part)));
        return this;
    }

    setHint(hint) {
        this.#hint_container.setText(hint);
        return this;
    }

};


export default Intro;
