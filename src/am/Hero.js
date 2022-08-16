
import Element from "./Element.js";


const Hero = class extends Element {

    /** @type {Array<string>} */
    #inventory;

    constructor(id, { name, states = {}, items = [] } = {}) {

        super(id, { name, states });

        if (items instanceof Array) {
            this.#inventory = items;
        }
    }

    /** @returns {Inventory} */
    getInventory() {
        return this.#inventory;
    }

};


export default Hero;
