
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import getWord from "../core/translate.js";

import Wrapper from "./Wrapper.js";


const TextPage = class extends Wrapper {

    /** @type {TextComponent} */
    #title_container;

    /** @type {Container} */
    #text_container;

    /** @type {TextComponent} */
    #hint_container;

    constructor(className) {

        super("Page Maximize");
        super.addClass(className);

        this.#title_container = new TextComponent(null, "Title");
        this.#text_container = new Container("Text");
        this.#hint_container = new TextComponent(null, "Hint");

        this.addComponent(
            new Container("Page Center").append(
                this.#title_container,
                this.#text_container,
                this.#hint_container
            )
        );
    }

    setTitle(id) {
        this.#title_container.setText(getWord(id));
        return this;
    }

    setText(id) {
        getWord(id).split(";").forEach((part) => this.#text_container.addComponent(new TextComponent(part)));
        return this;
    }

    setHint(id) {
        this.#hint_container.setText(getWord(id));
        return this;
    }

};


export default TextPage;
