import { hasProperty, isNumber, isString } from "../../lib/JST/native/type_check.js";


const BaseObject = class {

    #id;

    #name;

    #current_state;

    #explored;

    #info;

    #foreground;

    #background;

    #states;

    constructor(id, name = "Object", states = null) {

        this.#id = (isString(id)) ? id : "obj";
        this.#current_state = null;
        this.#explored = false;

        this.name = name;
        this.info = "";
        this.foreground = "0,0,0";
        this.background = "255,255,255";
        this.states = states;

    }

    getId() {
        return this.#id;
    }

    set name(name) {
        if (isString(name)) {
            this.#name = name;
        }
    }

    get name() {
        return this.#name;
    }

    set info(info) {
        if (isString(info, true)) {
            this.#info = info;
        }
    }

    get info() {
        return this.#info;
    }

    set foreground(color) {
        if (isString(color)) {
            this.#foreground = color;
        }
    }

    get foreground() {
        return this.#foreground;
    }

    set background(color) {
        if (isString(color)) {
            this.#background = color;
        }
    }

    get background() {
        return this.#background;
    }

    /** @param {{foreground: string, background: string}} colors */
    set colors(colors = {}) {
        if (hasProperty(colors, "foreground") && isString(colors.foreground)) {
            this.#foreground = colors.foreground;
        }
        if (hasProperty(colors, "background") && isString(colors.background)) {
            this.#background = colors.background;
        }
    }

    get colors() {
        return { foreground: this.#foreground, background: this.#background };
    }

    /** @param {Array<Object>} states */
    set states(states) {
        if (states instanceof Array) {
            this.#states = states.map((state) => ({ ...state, ...{ leftIndex: 0, rightIndex: 0 } }));
        }
    }

    get states() {
        return this.#states;
    }

    set currentState(id) {
        if (isNumber(id) && this.#states instanceof Array) {
            if (id === 0) {
                this.#current_state = null;
            } else {
                this.#current_state = this.#states.find((state) => state.id === id);
            }
        }
    }

    get currentState() {
        return this.#current_state;
    }

    getLeftAction() {

        let action = null;

        if (this.#current_state && hasProperty(this.#current_state, "left")) {

            action = this.#current_state.left[this.#current_state.leftIndex];

            if (this.#current_state.leftIndex < this.#current_state.left.length - 1) {
                this.#current_state.leftIndex = this.#current_state.leftIndex + 1;
            }

            if (hasProperty(action, "dupe")) {
                this.#current_state.rightIndex = this.#current_state.rightIndex + 1;
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

            if (hasProperty(action, "dupe")) {
                this.#current_state.leftIndex = this.#current_state.leftIndex + 1;
            }
        }

        return action;
    }

    getCombinations() {
        return (this.#current_state && hasProperty(this.#current_state, "comb")) ? this.#current_state.comb : null;
    }

    isExlored() {
        return this.#explored;
    }

};


export default BaseObject;
