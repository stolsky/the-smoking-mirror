
import { isEventType, isFunction, isString, isNotEmptyString, EventType } from "../native/typeCheck.js";

import { create, isUnique } from "./basic.js";

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
        this.#lastDisplay = null;
    }

    /** @param {string} className */
    addClass(className) {
        if (isString(className)) {
            this.#tag.classList.add(className);
        }
        return this;
    }

    /**
     * @param {string} type
     * @param {Function} method
     * @param {{once?:boolean}} options
     */
    addEventListener(type = EventType.pointerup, method = null, options = {}) {
        if (isEventType(type) && isFunction(method)) {
            this.#tag.addEventListener(type, method, options);
        }
        return this;
    }

    /** @deprecated */
    getHTMLElement() {
        return this.#tag;
    }

    getId() {
        return this.#tag.id;
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

    getParent() {
        return this.#parentContainer;
    }

    /** @param {string} key */
    getStyle(key) {
        return this.#tag.style.getPropertyValue(key);
    }

    /** @returns {{x: number, y: number, width: number, height: number, top: number, right: number, bottom: number, left: number}} */
    getBounds() {
        return this.#tag.getBoundingClientRect().toJSON();
    }

    // TODO getAttribute

    /** @param {string} className */
    hasClass(className) {
        return isString(className) && this.#tag.classList.contains(className);
    }


    hide() {
        this.#lastDisplay = this.#tag.style.display;
        this.setStyle("display", "none");
        return this;
    }

    remove() {
        this.#parentContainer = null;
        this.#tag.parentNode.removeChild(this.#tag);
        this.#tag = null;
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

    // TODO removeEventListener -> store listener


    setAttribute(key, value = "") {
        if (isString(key)) {
            this.#tag.setAttribute(key, value);
        }
        return this;
    }

    setId(id) {
        if (isUnique(id)) {
            this.#tag.id = id;
        }
        return this;
    }

    /** @param {Container} container */
    setParent(container) {
        if (container instanceof Container) {
            this.#parentContainer = container;
        }
        return this;
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

    view() {
        this.#tag.scrollIntoView();
        return this;
    }

};


export default Component;
