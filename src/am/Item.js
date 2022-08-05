import { hasProperty } from "../../lib/JST/native/typeCheck.js";
import BaseObject from "./BaseObject.js";


const Item = class extends BaseObject {

    constructor(id = "item", name = "Item", states = null) {

        if (!hasProperty(states, "left")) {
            Object.defineProperty(states, "left", { value: [{ stmt: ["SELF USE"] }] });
        }

        super(id, name, states);

        this.updateState(1);
    }

    updateState(id) {

        const now = this.setCurrentState(id).getCurrentState();
        if (now) {
            this.setInformation(now.info)
                .setName(now.name)
                .setForeground(now.fore)
                .setBackground(now.back);
        }
    }

};


export default Item;
