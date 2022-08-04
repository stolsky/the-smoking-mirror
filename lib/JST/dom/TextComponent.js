
import AbstractTextComponent from "./AbstractTextComponent.js";


const TextComponent = class extends AbstractTextComponent {

    /**
     * @param {string} text
     * @param {string} className
     * @param {string} tagName
     */
    constructor(text = null, className = null, tagName = "span") {
        super(tagName, className);
        this.setText(text);
    }

};


export default TextComponent;
