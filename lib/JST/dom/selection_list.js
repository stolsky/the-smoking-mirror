
import Container from "./component.js";
import TextComponent from "./text_component.js";
import { isNumber } from "../native/type_check.js";


const DEFAULT_SELECTION_SIZE = 10;
const SelectionList = class extends Container {

    /** @param {string} className */
    constructor(className = null) {
        super("select", className);
        this.setRows(DEFAULT_SELECTION_SIZE);
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    addItem(key, value) {
        this.addComponent((new TextComponent(key, null, "option")).setAttribute("value", value));
        return this;
    }

    /** @param {number} size */
    setRows(size) {
        if (isNumber(size)) {
            this.setAttribute("size", String(size));
        }
        return this;
    }

};


export default SelectionList;
