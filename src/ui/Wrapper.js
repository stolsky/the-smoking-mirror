
import { EventType, hasProperty, isFunction } from "../../lib/JST/native/typeCheck.js";
import Container from "../../lib/JST/dom/Container.js";

import InputEventManager from "../core/InputEventManager.js";


const Wrapper = class extends Container {

    /** Adds specified event listener or a default one if no parameter is set. */
    addListener(eventType = null, action = null) {
        if (hasProperty(EventType, eventType) && isFunction(action)) {
            this.addEventListener(eventType, action);
        } else {
            this.addEventListener(EventType.mouseup, (event) => InputEventManager.setInputEvent(event));
        }
    }

    /** @param {Container} renderer */
    render(renderer) {
        renderer.addComponent(this);
        return this;
    }

};


export default Wrapper;
