
import Element from "./Element.js";
import StringList from "./StringList.js";


const Hero = class extends Element {

    #inventory;

    constructor(id, name, states = {}, items = []) {

        super(id, name, states);

        this.#inventory = new StringList(items);
    }

    /** @returns {Inventory} */
    getInventory() {
        return this.#inventory;
    }

};


export default Hero;
