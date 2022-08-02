
import Element from "./element.js";
import Inventory from "./inventory.js";


const Hero = class extends Element {

    #inventory;

    constructor(id, name, states = {}, items = []) {

        super(id, name, states);

        this.#inventory = new Inventory(items);
    }

    /** @returns {Inventory} */
    getInventory() {
        return this.#inventory;
    }

};


export default Hero;
