
import { hasProperty, isFunction, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import InputEventManager from "../core/InputEventManager.js";

import Wrapper from "../ui/Wrapper.js";


/**
 * @interface
 */
const State = class {

    /** Members of renderQueue have the structure `{data: Array, callback: Function}`
     *
     * @private
     *
     * @type {}
     */
    #renderQueue;

    /** @private */
    #isAnimating;

    /** @private */
    #toRender;

    /**
     * @private
     *
     * @type {Wrapper}
     * */
    #ui;

    /**
     * @private
     *
     * @type {Function}
    */
    #handleInput;

    constructor() {

        this.#renderQueue = {};

        this.#isAnimating = false;
        this.#toRender = false;

        this.#ui = null;

        this.#handleInput = null;
    }

    /**
     * @param {string} queueID
     * @param {string} callbackName
     */
    addDataQueue(queueID, callbackName) {
        if (isNotEmptyString(queueID) && isNotEmptyString(callbackName)) {
            this.#renderQueue[`${queueID}`] = { data: [], callback: `${callbackName}` };
        }
        return this;
    }

    getUI() {
        return this.#ui;
    }

    isAnimationRunning() {
        return this.#isAnimating;
    }

    /**
     * @param {string} id
     * @param {{}} data
     */
    pushQueueData(id, data) {
        if (isNotEmptyString(id)) {
            if (hasProperty(this.#renderQueue, id)) {
                const selectedQueue = this.#renderQueue[`${id}`].data;
                if (data instanceof Array) {
                    selectedQueue.push(...data);
                } else {
                    selectedQueue.push(data);
                }
            }
        }
        return this;
    }

    setInputHandler(handler) {
        if (isFunction(handler)) {
            this.#handleInput = handler;
        }
        return this;
    }

    setUI(ui) {
        if (ui instanceof Wrapper) {
            this.#ui = ui;
            this.#toRender = true;
        }
        return this;
    }

    startAnimation() {
        this.#isAnimating = true;
        return this;
    }

    stopAnimation() {
        this.#isAnimating = false;
        return this;
    }


    enter() {
        return this;
    }

    exit() {
        if (this.#ui instanceof Wrapper) {
            this.#ui.clear().remove();
            this.#ui = null;
            this.#isAnimating = false;
            this.#toRender = false;
        }

        Object.keys(this.#renderQueue).forEach((key) => {
            delete this.#renderQueue[`${key}`];
        });
        this.#renderQueue = null;

    }

    render(ctx) {
        if (this.#toRender && this.#ui instanceof Wrapper) {
            this.#ui.render(ctx);
            this.#toRender = false;
        }

        Object.values(this.#renderQueue).forEach((queue) => {
            if (queue.data.length > 0) {
                this.#ui[`${queue.callback}`](queue.data);
                // eslint-disable-next-line no-param-reassign
                queue.data = [];
            }
        });

    }

    update() {
        if (isFunction(this.#handleInput)) {
            const input = InputEventManager.getInputEvent();
            if (input) {
                this.#handleInput(input);
            }
        }
    }

};


export default State;
