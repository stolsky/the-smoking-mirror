import { isBoolean, isString } from "../../lib/JST/native/type_check.js";
import BaseObject from "./base_object.js";


const Element = class extends BaseObject {

    #type;

    #moveable;

    #visible;

    constructor(id = "elem", name = "Element", states = null, initState = 1) {

        super(id, name, states);

        this.type = "Look";
        this.moveable = false;
        this.visible = true;

        this.updateState(initState);
    }

    set type(type) {
        if (isString(type)) {
            this.#type = type;
        }
    }

    get type() {
        return this.#type;
    }

    set visible(bool) {
        if (isBoolean(bool)) {
            this.#visible = bool;
        }
    }

    get visible() {
        return this.#visible;
    }

    set moveable(bool) {
        if (isBoolean(bool)) {
            this.#moveable = bool;
        }
    }

    get moveable() {
        return this.#moveable;
    }

    updateState(id) {
        super.currentState = id;
        const now = super.currentState;
        if (now) {
            this.type = now.type;
            super.info = now.info;
            super.name = now.name;
            super.foreground = now.fore;
            super.background = now.back;
            this.moveable = now.moveable;
            this.visible = now.visible;
        }
    }

};


export default Element;
