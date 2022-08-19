
import State from "./State.js";


const StateWrapper = class {

    #state;

    constructor(state) {
        if (state instanceof State) {
            this.#state = state;
        }
    }

    enter() {
        this.#state.enter();
    }

    exit() {
        this.#state.exit();
    }

    render(ctx) {
        this.#state.render(ctx);
    }

    update(dt) {
        this.#state.update(dt);
    }

};


export default StateWrapper;
