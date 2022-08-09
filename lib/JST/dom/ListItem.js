import AbstractTextComponent from "./AbstractTextComponent.js";


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
