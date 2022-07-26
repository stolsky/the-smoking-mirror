
import { hasProperty } from "../native/type_check.js";


const StateStack = class {

    /** @type {Array} */
    #states;

    constructor() {

        this.#states = [];

    }

    clear() {
        this.#states = [];
    }

    update(dt) {
        if (this.#states.length > 0) {
            this.#states[this.#states.length - 1].update(dt);
        }
    }

    render(ctx) {
        this.#states.forEach((state) => state.render(ctx));
    }

    /**
     * @param {{update: Function, render: Function, enter: Function, exit: Function}} state
     */
    push(state) {
        if (hasProperty(state, "update") && state.update instanceof Function
        && hasProperty(state, "render") && state.render instanceof Function
        && hasProperty(state, "enter") && state.enter instanceof Function
        && hasProperty(state, "exit") && state.exit instanceof Function) {
            this.#states.push(state);
            state.enter();
        }
    }

    pop() {
        const state = this.#states.pop();
        state.exit();
    }

    isEmpty() {
        return this.#states.length === 0;
    }

};


// eslint-disable-next-line import/prefer-default-export
export { StateStack };
