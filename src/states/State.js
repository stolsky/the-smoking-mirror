
import Wrapper from "../ui/Wrapper.js";


const State = class {

    #toRender;

    /** @type {Wrapper} */
    #wrapper;

    constructor() {

        // this.#wrapper = ..
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


export default State;
