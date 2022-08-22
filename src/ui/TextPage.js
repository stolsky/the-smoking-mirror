
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import getWord, { getTextAsArray } from "../core/translate.js";

import Wrapper from "./Wrapper.js";


const TextPage = class extends Wrapper {

    /** @type {TextComponent} */
    #title_container;

    /** @type {Container} */
    #text_container;

    /** @type {TextComponent} */
    #hint_container;

    constructor(className) {

        super("TextPage Maximize");
        super.addClass(className);

        this.#title_container = new TextComponent(null, "Title")
            .hide();
        this.#text_container = new Container("Text");
        this.#hint_container = new TextComponent(null, "Hint");

        this.append(
            new Container("Content Center").append(
                this.#title_container,
                this.#text_container
            ),
            this.#hint_container
        );

    }

    setTitle(id) {
        if (isNotEmptyString(id)) {
            this.#title_container.setText(getWord(id))
                .show();
        }
        return this;
    }

    setText(id) {
        getTextAsArray(id).forEach((part) => this.#text_container.addComponent(new TextComponent(part)));
        return this;
    }

    setHint(id) {
        this.#hint_container.setText(getWord(id));
        return this;
    }

};


export default TextPage;
