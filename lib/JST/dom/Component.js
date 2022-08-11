
import { create, isUnique } from "./basic.js";
import { isEventType, isFunction, isString, isNotEmptyString } from "../native/typeCheck.js";

import Container from "./Container.js";


const Component = class {

    /** @type {HTMLElement} */
    #tag;

    /** @type {Container} */
    #parentContainer;

    /** @type {String} */
    #lastDisplay;

    /**
     * @param {string} tagName
     * @param {string} className
     */
    constructor(tagName, className = null) {
        this.#tag = create(tagName, className);

        console.assert(this.#tag !== null);

        this.#tag.wrapper = this;
        this.#lastDisplay = null;
    }

    /** @param {string} className */
    addClass(className) {
        if (isString(className)) {
            this.#tag.classList.add(className);
        }
        return this;
    }

    /** @param {string} className */
    removeClass(className = null) {
        if (isString(className)) {
            this.#tag.classList.remove(className);
        } else if (className === null || className === undefined) {
            this.#tag.className = "";
        }
        return this;
    }

    /** @param {string} className */
    hasClass(className) {
        return isString(className) && this.#tag.classList.contains(className);
    }

    /**
     * @param {string} className
     * @param {boolean} force
     */
    toggleClass(className, force) {
        if (isNotEmptyString(className)) {
            this.#tag.classList.toggle(className, force);
        }
        return this;
    }

    getHTMLElement() {
        return this.#tag;
    }

    /** @param {Container} container */
    setParent(container) {
        if (container instanceof Container) {
            this.#parentContainer = container;
        }
        return this;
    }

    getParent() {
        return this.#parentContainer;
    }

    /**
     * @param {string} type
     * @param {EventListener} listener
     */
    addEventListener(type, listener) {
        if (isEventType(type) && isFunction(listener)) {
            this.#tag.addEventListener(type, listener);
        }
        return this;
    }

    // TODO removeEventListener -> store listener

    setId(id) {
        if (isUnique(id)) {
            this.#tag.id = id;
        }
        return this;
    }

    getId() {
        return this.#tag.id;
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    setStyle(key, value) {
        if (isNotEmptyString(key)) {
            this.#tag.style.setProperty(key, value);
        }
        return this;
    }

    /** @param {string} key */
    getStyle(key) {
        return this.#tag.style.getPropertyValue(key);
    }

    /** @param {boolean} overrideDefault */
    show(overrideDefault = false) {
        let val = "";
        if (this.#lastDisplay) {
            val = this.#lastDisplay;
        }
        if (overrideDefault) {
            val = "block";
        }
        this.setStyle("display", val);
        return this;
    }

    hide() {
        this.#lastDisplay = this.#tag.style.display;
        this.setStyle("display", "none");
        return this;
    }

    remove() {
        this.#parentContainer = null;
        this.#tag.parentNode.removeChild(this.#tag);
        this.#tag.wrapper = null;
        this.#tag = null;
        return this;
    }

    /** Returns the offset position in pixels to the nearest parent.
     *
     * @returns {{x: number, y: number}}
     */
    getOffsetPosition() {
        return { x: this.#tag.offsetLeft, y: this.#tag.offsetTop };
    }

    getOffsetSize() {
        return { width: this.#tag.offsetWidth, height: this.#tag.offsetHeight };
    }

    /** @returns {{x: number, y: number, width: number, height: number, top: number, right: number, bottom: number, left: number}} */
    getBounds() {
        return this.#tag.getBoundingClientRect().toJSON();
    }

    setAttribute(key, value = "") {
        if (isString(key)) {
            this.#tag.setAttribute(key, value);
        }
        return this;
    }

    // getAttribute

};


export default Component;
