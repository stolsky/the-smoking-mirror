
import { EventType, isFunction, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Transition from "../ui/Transition.js";
import GameStatesManager from "./GameStatesManager.js";


const TransitionState = class {

    #isAnimating;

    #nextTask;

    #fifo;

    #toRender;

    /** @type {Transition} */
    #wrapper;

    #getNextTask() {
        // get next transition/animation id / function
        const next = this.#fifo.shift();
        if (next) {

            // clear previous transition/animation by id
            if (isNotEmptyString(this.#nextTask)) {
                this.#wrapper.removeClass(this.#nextTask);
            }

            if (isNotEmptyString(next)) {
                // init transition/animation by id (css class name)
                this.#wrapper.addClass(next);
            }

        }

        // reset/store next transition/animation id
        this.#nextTask = next;
    }

    #processTask() {
        const next = this.#nextTask;
        if (isNotEmptyString(next)) {
            // play transition/animation
            this.#wrapper.setStyle("animation-play-state", "running");
            this.#isAnimating = true;
        } else if (isFunction(next)) {
            next();
            this.#getNextTask();
        }
    }

    /** @param {Array<string | Function} fifoQueue */
    constructor(fifoQueue) {

        this.#wrapper = new Transition()
            .addEventListener(EventType.animationend, () => {
                this.#isAnimating = false;
                this.#getNextTask();
            });

        this.#fifo = (fifoQueue instanceof Array) ? fifoQueue : [];

        this.#isAnimating = false;
        this.#toRender = true;

        this.#getNextTask();
    }

    enter() {
        return this;
    }

    exit() {
        this.#wrapper.remove();
        this.#wrapper = null;
        this.#nextTask = null;
        this.#fifo = null;
    }

    render(ctx) {
        if (this.#toRender) {
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        if (this.#nextTask) {
            if (!this.#isAnimating) {
                this.#processTask();
            }
        } else {
            GameStatesManager.notify("done");
        }
    }

};


export default TransitionState;
