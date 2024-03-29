
import AbstractTextComponent from "./AbstractTextComponent.js";


const TextButton = class extends AbstractTextComponent {

    /**
     * @param {string} text
     * @param {EventListener} actionListener
     */
    constructor(text, actionListener = null) {
        super("button");
        this.setText(text)
            .addEventListener("click", actionListener);
    }

};


export default TextButton;
