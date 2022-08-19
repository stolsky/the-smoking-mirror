
import { EventType, isFunction, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Container from "../../lib/JST/dom/Container.js";

import InputEventManager from "../core/InputEventManager.js";


const Wrapper = class extends Container {

    #playAnimation(animationName = null, callback = null) {
        if (isNotEmptyString(animationName)) {
            this.addAnimationEndListener(callback, { once: true });
            this.addClass(animationName)
                .setStyle("animation-play-state", "running");
        }
    }

    addAnimationEndListener(listener, options) {
        if (isFunction(listener)) {
            this.addEventListener(EventType.animationend, listener, options);
        }
        return this;
    }

    /** Adds specified event listener or a default one if no parameter is set. */
    addPointerListener() {
        this.addEventListener(EventType.pointerup, (event) => InputEventManager.setInputEvent(event));
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
