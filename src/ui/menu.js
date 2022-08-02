
import Container from "../../lib/JST/dom/container.js";
import TextComponent from "../../lib/JST/dom/text_component.js";
import TextButton from "../../lib/JST/dom/text_button.js";

import Wrapper from "./wrapper.js";


const Menu = class extends Wrapper {

    /** @type {TextComponent} */
    #title = null;

    /** @type {TextComponent} */
    #subtitle = null;

    /** @type {Container} */
    #buttons = null;

    /** @type {TextComponent} */
    #disclaimer = null;

    static #setTextComponentText = (textComponent, text) => {
        if (textComponent instanceof TextComponent) {
            textComponent.setText(text);
        }
    };

    constructor() {

        super("Menu Center");

        this.#title = new TextComponent(null, "Title");
        this.#subtitle = new TextComponent(null, "SubTitle");

        this.#buttons = new Container("ButtonBox");

        this.#disclaimer = new TextComponent(null, "Disclaimer");

        this.append(
            new Container("TitleBox").append(this.#title, this.#subtitle),
            this.#buttons,
            this.#disclaimer
        );

    }

    setTitle(val) {
        Menu.#setTextComponentText(this.#title, val);
        return this;
    }

    setSubTitle(val) {
        Menu.#setTextComponentText(this.#subtitle, val);
        return this;
    }

    addButton(text, action) {
        if (this.#buttons instanceof Container) {
            this.#buttons.addComponent(new TextButton(text, action));
        }
        return this;
    }

    setDisclaimer(val) {
        Menu.#setTextComponentText(this.#disclaimer, val);
        return this;
    }

};


export default Menu;
