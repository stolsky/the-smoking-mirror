import { hasProperty, isBoolean, isNotEmptyString, isNumber, isString } from "../../lib/JST/native/typeCheck.js";

// TODO improve code not returning null

const BaseObject = class {

    /** @type {string} */
    #id;

    /** @type {string} */
    #name;

    /** @type {{}} */
    #currentState;

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

    static #createIndex({ left, right }) {
        const indices = {};
        if (left instanceof Array) {
            indices.leftIndex = 0;
        }
        if (right instanceof Array) {
            indices.rightIndex = 0;
        }
        return indices;
    }

    #isQueueExplored(queueName) {
        return (hasProperty(this.#currentState, queueName)) ? this.#currentState[`${queueName}Index`] === this.#currentState[`${queueName}`].length : true;
    }

    #getAction(property = "left") {

        let action = null;

        if (this.#currentState instanceof Object && hasProperty(this.#currentState, property)) {

            const indexKey = `${property}Index`;
            const index = this.#currentState[`${indexKey}`];
            const actionStack = this.#currentState[`${property}`];

            if (actionStack instanceof Array) {
                action = actionStack[`${index}`] || actionStack.at(-1);
                if (index < actionStack.length) {
                    this.#currentState[`${indexKey}`] = index + 1;
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
    getAction({ left, right }) {
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
        if (this.#currentState) {
            const { combos } = this.#currentState;
            if (combos instanceof Array) {
                return this.#currentState.combos;
            }
        }
        return null;
    }

    getCurrentState() {
        return this.#currentState;
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

    isExplored() {
        return this.#isQueueExplored("left") && this.#isQueueExplored("right");
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
            this.#currentState = this.#states.find((state) => state.id === id) ?? null;
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
            this.#states = states.map((state) => ({ ...state, ...BaseObject.#createIndex(state) }));
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
