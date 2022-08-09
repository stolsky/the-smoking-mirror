
import { EventType } from "../../lib/JST/native/typeCheck.js";
import Transition from "../ui/Transition.js";
import GameStatesManager from "./GameStatesManager.js";


const TransitionState = class {

    #isAnimating;

    #toRender;

    /** @type {Transition} */
    #wrapper;

    constructor({ name }) {

        this.#wrapper = new Transition(name);
        this.#wrapper.addEventListener(EventType.animationend, () => GameStatesManager.notify("done"));

        this.#isAnimating = false;
        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        this.#wrapper.clear().remove();
        this.#wrapper = null;
        this.#toRender = false;
    }

    render(ctx) {
        if (this.#toRender) {
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        if (!this.#isAnimating) {
            this.#wrapper.setStyle("animation-play-state", "running");
            this.#isAnimating = true;
        }
        return this;
    }

};


export default TransitionState;
