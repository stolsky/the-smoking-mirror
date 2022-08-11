
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

        this.#label = null;
        this.setLabel(labelText);
    }

    /** @param {string} text */
    setLabel(text) {
        if (isString(text)) {
            if (this.#label instanceof TextComponent) {
                this.#label.setText(text);
            } else {
                this.#label = new TextComponent(text, "Label");
                this.addComponent(this.#label);
            }
        }
    }

};


export default LabeledContainer;
