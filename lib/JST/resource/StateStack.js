
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
        if (!this.isEmpty()) {
            this.#states[this.#states.length - 1].update(dt);
        }
    }

    render(ctx = null) {
        if (!this.isEmpty()) {
            // this.#states[this.#states.length - 1].render(ctx);
            this.#states.forEach((state) => state.render(ctx));
        }
    }

    /**
     * @param {{update: Function, render: Function, enter: Function, exit: Function}} state
     */
    push(state) {
        if (state.update instanceof Function && state.render instanceof Function && state.enter instanceof Function && state.exit instanceof Function) {
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


export default StateStack;
