
import { isBoolean, isString } from "../../lib/JST/native/typeCheck.js";

import BaseObject from "./BaseObject.js";


const Element = class extends BaseObject {

    /** @type {string} */
    #type;

    /** @type {boolean} */
    #moveable;

    constructor(id, { name, states = null } = {}) {

        super(id, name, states);

        this.#type = "Look";
        this.#moveable = false;

        this.updateState(1);
    }

    getProperties() {
        return {
            ...super.getProperties(),
            type: this.getType(),
            moveable: this.isMoveable()
        };
    }

    getType() {
        return this.#type;
    }

    isMoveable() {
        return this.#moveable;
    }

    setMobility(bool) {
        if (isBoolean(bool)) {
            this.#moveable = bool;
        }
        return this;
    }

    setType(type) {
        if (isString(type)) {
            this.#type = type;
        }
        return this;
    }

    updateState(id) {

        // TODO improve with object destructuring
        const now = this.setCurrentState(id).getCurrentState();
        if (now) {
            this.setType(now.type)
                .setInformation(now.info)
                .setName(now.name)
                .setForeground(now.fore)
                .setBackground(now.back)
                .setMobility(now.moveable)
                .setVisibility(now.visible);
        }
    }

};


export default Element;
