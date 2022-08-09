
import Wrapper from "../ui/Wrapper.js";
import Transition from "../ui/Transition.js";


const TransitionState = class {

    #toRender;

    /** @type {Wrapper} */
    #wrapper;

    constructor({ color }) {
        this.#wrapper = new Transition(color);
        this.#toRender = true;
    }

    enter() {
        // set initial values
        return this;
    }

    exit() {
        if (this.#wrapper instanceof Wrapper) {
            this.#wrapper.clear().remove();
            this.#wrapper = null;
            this.#toRender = false;
        }
    }

    render(ctx) {
        if (this.#toRender && this.#wrapper instanceof Wrapper) {
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        return this;
    }

};


export default TransitionState;
