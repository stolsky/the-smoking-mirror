
import AbstractTextComponent from "./AbstractTextComponent.js";


const FormLabel = class extends AbstractTextComponent {

    /** @param {string} text */
    constructor(text) {

        super("label");
        this.setAttribute("for", text)
            .setText(text);
    }

};


export default FormLabel;
