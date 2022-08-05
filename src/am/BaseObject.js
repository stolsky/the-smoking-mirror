import { hasProperty, isNotEmptyString, isNumber, isString } from "../../lib/JST/native/typeCheck.js";


const BaseObject = class {

    /** @type {string} */
    #id;

    /** @type {string} */
    #name;

    /** @type {{}} */
    #current_state;

    /** @type {string} */
    #info;

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

    getId() {
        return this.#id;
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

    setName(name) {
        if (isNotEmptyString(name)) {
            this.#name = name;
        }
        return this;
    }

    getName() {
        return this.#name;
    }

    setInformation(info) {
        if (isString(info, true)) {
            this.#info = info;
        }
        return this;
    }

    getInformation() {
        return this.#info;
    }

    setForeground(color) {
        if (isString(color)) {
            this.#foreground = color;
        }
        return this;
    }

    getForeground() {
        return this.#foreground;
    }

    setBackground(color) {
        if (isString(color)) {
            this.#background = color;
        }
        return this;
    }

    getBackground() {
        return this.#background;
    }

    /** @param {{foreground: string, background: string}} colors */
    setColors(colors = {}) {
        if (hasProperty(colors, "foreground") && isString(colors.foreground)) {
            this.#foreground = colors.foreground;
        }
        if (hasProperty(colors, "background") && isString(colors.background)) {
            this.#background = colors.background;
        }
        return this;
    }

    getColors() {
        return { foreground: this.#foreground, background: this.#background };
    }

    /** @param {Array<Object>} states */
    setStates(states) {
        if (states instanceof Array) {
            this.#states = states.map((state) => ({ ...state, ...{ leftIndex: 0, rightIndex: 0 } }));
        }
        return this;
    }

    getStates() {
        return this.#states;
    }

    setCurrentState(id) {
        if (isNumber(id) && this.#states instanceof Array) {
            this.#current_state = this.#states.find((state) => state.id === id) ?? null;
        }
        return this;
    }

    getCurrentState() {
        return this.#current_state;
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

    getCombinations() {
        return (this.#current_state && hasProperty(this.#current_state, "comb")) ? this.#current_state.comb : null;
    }

};


export default BaseObject;
