import BaseObject from "./base_object.js";


const Item = class extends BaseObject {

    constructor(id = "item", name = "Item", states = null, initState = 1) {
        super(id, name, states);

        this.updateState(initState);
    }

    updateState(id) {

        super.currentState = id;
        const now = super.currentState;
        if (now) {
            super.info = now.info;
            super.name = now.name;
            super.foreground = now.fore;
            super.background = now.back;
        }
    }

};


export default Item;
