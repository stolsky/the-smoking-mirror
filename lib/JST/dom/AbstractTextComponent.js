
import Component from "./Component.js";
import { isString } from "../native/typeCheck.js";


const AbstractTextComponent = class extends Component {

    #text;

    /** @param {string} text */
    setText(text) {
        if (isString(text, true)) {
            this.#text = text;
            this.getHTMLElement().textContent = text;
        }
        return this;
    }

    getText() {
        return this.#text;
    }

};


export default AbstractTextComponent;
