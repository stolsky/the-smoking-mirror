
import InputComponent, { InputType } from "./InputComponent.js";
import Container from "./Container.js";
import FormLabel from "./FormLabel.js";
import { isString } from "../native/typeCheck.js";


const RadioButton = class extends Container {

    /** @type {InputComponent} */
    #input;

    /**
     * @param {string} label
     * @param {any} value
     * @param {EventListener} action
     */
    constructor(label, value, action = null) {

        super("RadioButton");

        this.#input = new InputComponent(InputType.RadioButton);
        this.#input.setId(label)
            .setValue(`${value}`)
            .addEventListener("change", () => action(this.#input.getValue()));

        this.addComponent(new FormLabel(label))
            .addComponent(this.#input);

    }

    check() {
        this.#input.setAttribute("checked", "checked");
        return this;
    }

    setGroupName(name) {
        if (this.#input instanceof InputComponent && isString(name)) {
            this.#input.setName(name);
        }
        return this;
    }

    getGroupName() {
        return this.#input.getName();
    }

};


export default RadioButton;
