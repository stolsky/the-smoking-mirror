
import { isString } from "../native/typeCheck.js";
import Container from "./Container.js";
import TextComponent from "./TextComponent.js";


const LabeledContainer = class extends Container {

    /** @type {TextComponent} */
    #label;

    /**
     * @param {string} labelText
     * @param {string} className
     */
    constructor(labelText, className = null) {

        super(className);

        if (isString(labelText)) {
            this.#label = new TextComponent(labelText, "Label");
            this.addComponent(this.#label);
        }

    }

    /** @param {string} text */
    setLabel(text) {
        if (isString(text)) {
            if (!this.#label) {
                this.#label = new TextComponent(text, "Label");
            }
            this.#label.setText(text);
        }
    }

};


export default LabeledContainer;
