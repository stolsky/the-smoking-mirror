
import Container from "./container.js";
import ListItem from "./list_item.js";


const ListContainer = class extends Container {

    /**
     * @param {string} className
     * @param {boolean} ordered
     */
    constructor(className = null, ordered = false) {

        const tag = (ordered) ? "ol" : "ul";
        super(tag, className);
    }

    /** @param {ListItem} item */
    addItem(item) {
        if (item instanceof ListItem) {
            super.addComponent(item);
        }

    }

    /** @param {ListItem} item */
    addComponent(item) {
        this.addItem(item);
    }

};


export default ListContainer;
