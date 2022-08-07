import { hasProperty, isNotEmptyString, isNumber, isString } from "../../lib/JST/native/typeCheck.js";

// TODO improve code not returning null

const BaseObject = class {

    /** @type {string} */
    #id;

    /** @type {string} */
    #name;

    /** @type {{}} */
    #current_state;

    /** @type {string} */
    #information;

    /** @type {string} */
    #foreground;

    /** @type {string} */
    #background;

    /** @type {Array<{}>} */
    #states;

    constructor(id, name = "Object", states = null) {

        this.#id = (isNotEmptyString(id)) ? id : "obj";

        this.setName(name)
            .setInformation("")
            .setForeground("0,0,0")
            .setBackground("255,255,255")
            .setStates(states)
            .setCurrentState(-1);
    }

    getBackground() {
        return this.#background;
    }

    getCombinations() {
        return (this.#current_state && hasProperty(this.#current_state, "comb")) ? this.#current_state.comb : null;
    }

    getCurrentState() {
        return this.#current_state;
    }

    getForeground() {
        return this.#foreground;
    }

    getId() {
        return this.#id;
    }

    getInformation() {
        return this.#information;
    }

    getLeftAction() {
        let action = null;
        if (this.#current_state && hasProperty(this.#current_state, "left")) {
            action = this.#current_state.left[this.#current_state.leftIndex];
            if (this.#current_state.leftIndex < this.#current_state.left.length - 1) {
                this.#current_state.leftIndex = this.#current_state.leftIndex + 1;
            }
        }
        return action;
    }

    getName() {
        return this.#name;
    }

    /** @returns {{id: string, name: string, foreground: string, background: string, information: string}} */
    getProperties() {
        return {
            id: this.getId(),
            name: this.getName(),
            foreground: this.getForeground(),
            background: this.getBackground(),
            information: this.getInformation()
        };
    }

    getRightAction() {
        let action = null;
        if (this.#current_state && hasProperty(this.#current_state, "right")) {
            action = this.#current_state.right[this.#current_state.rightIndex];
            if (this.#current_state.rightIndex < this.#current_state.right.length - 1) {
                this.#current_state.rightIndex = this.#current_state.rightIndex + 1;
            }
        }
        return action;
    }

    getStates() {
        return this.#states;
    }

    setBackground(color) {
        if (isNotEmptyString(color)) {
            this.#background = color;
        }
        return this;
    }

    setCurrentState(id) {
        if (isNumber(id) && this.#states instanceof Array) {
            this.#current_state = this.#states.find((state) => state.id === id) ?? null;
        }
        return this;
    }

    setForeground(color) {
        if (isNotEmptyString(color)) {
            this.#foreground = color;
        }
        return this;
    }

    setInformation(information) {
        if (isString(information, true)) {
            this.#information = information;
        }
        return this;
    }

    setName(name) {
        if (isNotEmptyString(name)) {
            this.#name = name;
        }
        return this;
    }

    /** @param {Array<Object>} states */
    setStates(states) {
        if (states instanceof Array) {
            this.#states = states.map((state) => ({ ...state, ...{ leftIndex: 0, rightIndex: 0 } }));
        }
        return this;
    }

};


export default BaseObject;
