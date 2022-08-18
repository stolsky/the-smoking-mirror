
import Element from "./Element.js";
import Inventory from "./Inventory.js";


const Hero = class extends Element {

    /** @type {Inventory} */
    #inventory;

    constructor(id, { name, states = {}, items = [] } = {}) {

        super(id, { name, states });

        this.#inventory = new Inventory().addAll(items);
    }

    /** @returns {Inventory} */
    getInventory() {
        return this.#inventory;
    }

};


export default Hero;
