
import Container from "../../lib/JST/dom/Container.js";


const Wrapper = class {

    /** @type {Container} */
    #wrapper;

    constructor(classNames) {
        this.#wrapper = new Container(classNames);
    }

    /**
     * @param {EventType} type
     * @param {Function} listener
     *
     * @returns {Wrapper}
     */
    addEventListener(type, listener) {
        this.#wrapper.addEventListener(type, listener);
        return this;
    }

    addComponent(component) {
        this.#wrapper.addComponent(component);
        return this;
    }

    append(...components) {
        this.#wrapper.append(components);
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
