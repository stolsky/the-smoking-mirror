
import Component from "./Component.js";
import { isNotEmptyString } from "../native/typeCheck.js";


const InputType = Object.freeze({
    CheckBox: "checkbox",
    RadioButton: "radio",
    Textarea: "textarea",
    TextField: "text",
    File: "file"
});

const InputComponent = class extends Component {

    #name;

    #value;

    /**
     * @param {string} type
     * @param {string} className
     */
    constructor(type, className = null) {

        if (isNotEmptyString(type) && type === InputType.Textarea) {
            super("textarea", className);
        } else if (Object.values(InputType).includes(type)) {
            super("input", className);
            this.setAttribute("type", type);
        } else {
            super();
        }

    }

    setValue(value) {
        this.#value = `${value}`;
        this.setAttribute("value", this.#value);
        return this;
    }

    getValue() {
        return this.#value;
    }

    setName(name) {
        if (isNotEmptyString(name)) {
            this.#name = name;
            this.setAttribute("name", name);
        }
        return this;
    }

    getName() {
        return this.#name;
    }

    setOptions(options = {}) {
        //

        return this;
    }

};


export default InputComponent;
export { InputType };
