
import { EventType, isFunction, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Container from "../../lib/JST/dom/Container.js";

import InputEventManager from "../core/InputEventManager.js";


const Wrapper = class extends Container {

    #playAnimation(animationName = null, callback = null) {
        if (isFunction(callback)) {
            this.addEventListener(EventType.animationend, () => callback(), { once: true });
        }
        if (isNotEmptyString(animationName)) {
            this.addClass(animationName)
                .setStyle("animation-play-state", "running");
        }
    }

    /** Adds specified event listener or a default one if no parameter is set. */
    addPointerListener(method = null) {
        const listener = (isFunction(method)) ? method : (event) => InputEventManager.setInputEvent(event);
        this.addEventListener(EventType.pointerup, listener);
        return this;
    }

    /**
     * @override
     *
     * @param {Function} callback
     *
     * @returns {Wrapper}
     */
    hide(callback) {
        this.#playAnimation("HideAnimation", callback);
        return this;
    }

    /** @param {Container} renderer */
    render(renderer) {
        renderer.addComponent(this);
        return this;
    }

    /**
     * @override
     *
     * @param {Function} callback
     *
     * @returns {Wrapper}
     */
    show(callback) {
        this.#playAnimation("ShowAnimation", callback);
        return this;
    }

};


export default Wrapper;
