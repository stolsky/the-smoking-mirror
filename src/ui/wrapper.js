
import Container from "../../lib/JST/dom/container.js";
import { EventType } from "../../lib/JST/native/type_check.js";


const Wrapper = class {

    /** @type {Container} */
    #wrapper;

    constructor(classNames) {
        this.#wrapper = new Container(classNames);
    }

    addAction(listener) {
        this.#wrapper.addEventListener(EventType.click, listener);
        return this;
    }

    addComponent(component) {
        this.#wrapper.addComponent(component);
        return this;
    }

    append(...components) {
        components.forEach((component) => this.addComponent(component));
        return this;
    }

    clear() {
        this.#wrapper.clear();
        return this;
    }

    getContainer() {
        return this.#wrapper;
    }

    remove() {
        this.#wrapper.remove();
        return this;
    }

    /** @param {} renderer */
    render(renderer) {
        renderer.addComponent(this.#wrapper);
        return this;
    }

    replaceComponent(newComponent, oldComponent) {
        this.#wrapper.replaceComponent(newComponent, oldComponent);
        return this;
    }

};


export default Wrapper;
