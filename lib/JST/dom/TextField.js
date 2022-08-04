
import { isString } from "../native/typeCheck.js";
import InputComponent, { InputType } from "./InputComponent.js";


const TextField = class extends InputComponent {

    #text;

    constructor(text = null, className = null) {

        super(InputType.TextField, className);

        this.setText(text);

    }

    setText(text) {
        if (isString(text)) {
            this.#text = text;
            super.setValue(text);
        }
        return this;
    }

    getText() {
        return this.#text;
    }

};


export default TextField;
