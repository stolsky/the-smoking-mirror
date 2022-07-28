
import Component from "./component.js";
import { isString } from "../native/type_check.js";


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

        if (isString(type) && type === InputType.Textarea) {
            super("textarea", className);
        } else if (Object.values(InputType).includes(type)) {
            super("input", className);
            this.setAttribute("type", type);
        } else {
            super(null);
        }

    }

    setValue(value) {
        this.#value = `${value}`;
        this.getHTMLElement().value = `${value}`;
        return this;
    }

    getValue() {
        return this.#value;
    }

    setName(name) {
        if (isString(name)) {
            this.#name = name;
            this.getHTMLElement().name = name;
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

/*
const TextField = class extends InputComponent {

    constructor (text = null, className = null) {

        super(InputType.TextField, className);

        if (isString(text)) {
            this.value = text;
        }

    }

    set text (text) {
        if (isString(text)) {
            this.value = text;
        }
    }
    get text () {
        return this.value;
    }

};
*/

export {
    InputComponent,
    InputType
};
