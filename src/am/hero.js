
import Element from "./element.js";
import StringList from "./string_list.js";


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
