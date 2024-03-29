
import { isString } from "../native/typeCheck.js";
import Container from "./Container.js";
import RadioButton from "./RadioButton.js";


const RadioButtonGroup = class extends Container {

    /** @type {String} */
    #name;

    /**
     * @param {string} groupName
     * @param {string} className
     */
    constructor(groupName, className = null) {

        super(className);

        this.#name = (isString(groupName)) ? groupName : "RadioButtonGroup";
    }

    /**
     * @override
     *
     * @param {RadioButton} radio_button
     */
    addRadioButton(radio_button) {
        if (radio_button instanceof RadioButton) {
            this.addComponent(radio_button.setGroupName(this.#name));
        }
    }

    /**
     * @override
     *
     * @param {Array<RadioButton>} radio_buttons
     */
    append(...radio_buttons) {
        if (radio_buttons instanceof Array) {
            radio_buttons.forEach((button) => this.addRadioButton(button));
        }
        return this;
    }

};


export default RadioButtonGroup;
