
import Container from "./Container.js";
import ListItem from "./ListItem.js";


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
