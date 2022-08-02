
import Container from "../../lib/JST/dom/container.js";
import TextComponent from "../../lib/JST/dom/text_component.js";
import TextButton from "../../lib/JST/dom/text_button.js";


const Menu = class {

    /** @type {Container} */
    #wrapper = null;

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

        this.#wrapper = new Container("Menu");
        this.#wrapper.addClass("Center");

        this.#title = new TextComponent("Title");
        this.#subtitle = new TextComponent("SubTitle");

        this.#buttons = new Container("ButtonBox");

        this.#disclaimer = new TextComponent("Disclaimer");

        this.#wrapper.append(
            new Container("TitleBox").append(this.#title, this.#subtitle),
            this.#buttons,
            this.#disclaimer
        );

    }

    setTitle(val) {
        Menu.#setTextComponentText(this.#title, val);
    }

    setSubTitle(val) {
        Menu.#setTextComponentText(this.#subtitle, val);
    }

    addButton(text, action) {
        if (this.#buttons instanceof Container) {
            this.#buttons.addComponent(new TextButton(text, action));
        }
    }

    clearButtons() {
        if (this.#buttons instanceof Container) {
            this.#buttons.clear();
        }
    }

    setDisclaimer(val) {
        Menu.#setTextComponentText(this.#disclaimer, val);
    }

    getContainer() {
        return this.#wrapper;
    }

};


export default Menu;
