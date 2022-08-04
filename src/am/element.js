import { isBoolean, isString } from "../../lib/JST/native/typeCheck.js";
import BaseObject from "./BaseObject.js";


const Element = class extends BaseObject {

    #type;

    #moveable;

    #visible;

    constructor(id = "elem", name = "Element", states = null) {

        super(id, name, states);

        this.#type = "Look";
        this.#moveable = false;
        this.#visible = true;

        this.updateState(1);
    }

    setType(type) {
        if (isString(type)) {
            this.#type = type;
        }
        return this;
    }

    getType() {
        return this.#type;
    }

    setVisible(bool) {
        if (isBoolean(bool)) {
            this.#visible = bool;
        }
        return this;
    }

    isVisible() {
        return this.#visible;
    }

    setMoveable(bool) {
        if (isBoolean(bool)) {
            this.#moveable = bool;
        }
        return this;
    }

    isMoveable() {
        return this.#moveable;
    }

    updateState(id) {

        const now = this.setCurrentState(id).getCurrentState();
        if (now) {
            this.setType(now.type)
                .setInformation(now.info)
                .setName(now.name)
                .setForeground(now.fore)
                .setBackground(now.back)
                .setMoveable(now.moveable)
                .setVisible(now.visible);
        }
    }

};


export default Element;
