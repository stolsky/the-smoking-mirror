import BaseObject from "./base_object.js";


const Item = class extends BaseObject {

    constructor(id = "item", name = "Item", states = null) {
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
