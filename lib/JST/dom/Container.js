
import { isNumber } from "../native/typeCheck.js";

import Component from "./Component.js";


const Container = class extends Component {

    /** @type {Array<Component>} */
    #children;

    /** @param {string} className */
    constructor(className = null) {

        super("div", className);
        this.#children = [];
    }

    /**
     * @param {Component} component
     * @param {number} index
     */
    addComponent(component, index = -1) {
        if (component instanceof Component) {

            /** @type {HTMLElement} */
            const this_container = this.getHTMLElement();

            const new_child = component;
            new_child.setParent(this);

            if (isNumber(index)) {
                if (index === -1) {
                    this_container.appendChild(new_child.getHTMLElement());
                    this.#children.push(new_child);
                } else if (index === 0) {
                    this_container.insertBefore(new_child.getHTMLElement(), this_container.firstChild);
                    this.#children.splice(0, 0, new_child);
                } else {
                    // TODO add to specific index
                }
            }
        }
        return this;
    }

    /** @param {Component} component */
    removeComponent(component) {
        const index = this.#children.findIndex((child) => child === component);
        return this.#children.splice(index, 1).length === 1;
    }

    /**
     * @param {Component} newComponent
     * @param {Component} oldComponent
     */
    replaceComponent(newComponent, oldComponent) {
        if (newComponent instanceof Component && oldComponent instanceof Component) {
            // TODO test next line
            const index = this.#children.findIndex((child) => child.getHTMLElement() === oldComponent.getHTMLElement());
            if (index !== -1) {
                this.#children.splice(index, 1, newComponent);
                this.getHTMLElement().replaceChild(newComponent.getHTMLElement(), oldComponent.getHTMLElement());
            }
        }
        return this;
    }

    /** @param {Array<Component>} components */
    append(...components) {
        components.forEach((comp) => this.addComponent(comp));
        return this;
    }

    /** @returns {Array<Component>} */
    getChildren() {
        return this.#children;
    }

    clear() {
        while (this.#children.length > 0) {
            let child = this.#children.pop();
            child.remove();
            child = null;
        }
        return this;
    }

};


export default Container;
