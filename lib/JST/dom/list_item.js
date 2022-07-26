import AbstractTextComponent from "./abstract_text_component.js";


const ListItem = class extends AbstractTextComponent {

    /**
     * @param {string} text
     * @param {string} className
     */
    constructor(text = null, className = null) {
        super("li", className);
        this.setText(text);
    }

};


export default ListItem;
