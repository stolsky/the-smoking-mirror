
import BaseObject from "./BaseObject.js";


const Item = class extends BaseObject {

    constructor(id, { name, states } = {}) {

        super(id, name, states);

        this.updateState(1);
    }

    updateState(id) {

        const now = this.setCurrentState(id).getCurrentState();
        if (now) {
            this.setInformation(now.info)
                .setName(now.name)
                .setForeground(now.fore)
                .setBackground(now.back)
                .setVisibility(now.visible);
        }
    }

};


export default Item;
