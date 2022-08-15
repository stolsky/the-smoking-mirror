import { hasProperty, isBoolean, isNotEmptyString, isNumber, isString } from "../../lib/JST/native/typeCheck.js";

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

    /** @type {boolean} */
    #visible;

    /** @type {Array<{}>} */
    #states;

    #getAction(property = "left") {

        let action = null;

        if (this.#current_state instanceof Object && hasProperty(this.#current_state, property)) {

            const indexKey = `${property}Index`;
            const index = this.#current_state[`${indexKey}`];
            const actionStack = this.#current_state[`${property}`];

            if (actionStack instanceof Array) {
                action = actionStack[`${index}`];
                if (index < actionStack.length - 1) {
                    this.#current_state[`${indexKey}`] = index + 1;
                }
            }
        }

        return action;
    }

    constructor(id, name, states) {

        this.#id = (isNotEmptyString(id)) ? id : "obj";

        this.setName(name)
            .setStates(states)
            .setVisibility(true)
            .setCurrentState(-1);
    }

    // eslint-disable-next-line no-unused-vars
    getAction({ left, middle, right }) {

        if (left) {
            return this.#getAction("left");
        }

        if (right) {
            return this.#getAction("right");
        }

        return {};
    }

    getBackground() {
        return this.#background;
    }

    getCombinations() {
        if (this.#current_state) {
            const { combos } = this.#current_state;
            if (combos instanceof Array) {
                return this.#current_state.combos;
            }
        }
        return null;
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
            information: this.getInformation(),
            visible: this.isVisible()
        };
    }

    getStates() {
        return this.#states;
    }

    isVisible() {
        return this.#visible;
    }

    setBackground(color) {
        if (isNotEmptyString(color)) {
            this.#background = color;
        }
        return this;
    }

    setCurrentState(id) {
        if (isNumber(id)) {
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
        } else {
            this.#states = [];
        }
        return this;
    }

    setVisibility(bool) {
        if (isBoolean(bool)) {
            this.#visible = bool;
        }
        return this;
    }

};


export default BaseObject;
