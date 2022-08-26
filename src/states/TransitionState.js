
import { isFunction, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import Transition from "../ui/Transition.js";

import GameStatesManager from "./GameStatesManager.js";
import State from "./State.js";


const TransitionState = class extends State {

    #nextTask;

    #fifo;

    #getNextTask() {
        // get next transition/animation id / function
        const next = this.#fifo.shift();
        if (next) {

            // clear previous transition/animation by id
            if (isNotEmptyString(this.#nextTask)) {
                this.getUI().removeClass(this.#nextTask);
            }

            if (isNotEmptyString(next)) {
                // init transition/animation by id (css class name)
                this.getUI().addClass(next);
            }

        }

        // reset/store next transition/animation id
        this.#nextTask = next;
    }

    #processTask() {
        const next = this.#nextTask;
        if (isNotEmptyString(next)) {
            // play transition/animation
            this.getUI().setStyle("animation-play-state", "running");
            this.startAnimation();
        } else if (isFunction(next)) {
            next();
            this.#getNextTask();
        }
    }

    /** @param {Array<string | Function} fifoQueue */
    constructor(fifoQueue) {

        super();

        this.setUI(
            new Transition()
                .addAnimationEndListener(() => {
                    this.stopAnimation();
                    this.#getNextTask();
                })
        );

        this.#fifo = (fifoQueue instanceof Array) ? fifoQueue : [];

        this.#getNextTask();
    }

    /** @override */
    exit() {
        super.exit();
        this.#nextTask = null;
        this.#fifo = null;
    }

    /** @override */
    update() {
        if (this.#nextTask) {
            if (!this.isAnimationRunning()) {
                this.#processTask();
            }
        } else {
            GameStatesManager.notify("done");
        }
    }

};


export default TransitionState;
