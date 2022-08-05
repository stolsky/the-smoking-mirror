
import { EventType, isNotEmptyString, isString } from "../../lib/JST/native/typeCheck.js";
import { $ } from "../../lib/JST/dom/queries.js";
import Cache from "../../lib/JST/resource/Cache.js";
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import EventManager from "../core/EventManager.js";
import getWord from "../core/translate.js";

import Wrapper from "./Wrapper.js";


const HIGHLIGHT = "Highlight";

/**
 * @param {Container} element
 * @param {string} className
 */
const updateClassName = (element, className) => {
    if (isNotEmptyString(className) && !element.hasClass(className)) {
        // TODO replace class type not add it
        element.addClass(className);
    }
};

/**
 * @param {TextComponent} element
 * @param {string} text
 */
const updateText = (element, text) => {
    if (isString(text)) {
        if (element.getText() !== text) {
            element.setText(text);
        }
    }
};

/**
 * @param {Container} parent
 * @param {string} className
 * @param {string} text
 */
const updateTextComponent = (parent, className, text) => {
    const child = $(parent, `.${className}`);
    if (child) {
        updateText(child, text);
    } else {
        parent.addComponent(new TextComponent(text, className));
    }
};

/**
 * @param {Container} element
 * @param {string} cssProperty
 * @param {string} value
 */
const updateStyle = (element, key, value) => {
    if (isNotEmptyString(value)) {
        // TODO add space after commas in color values
        if (element.getStyle(key) !== value) {
            element.setStyle(key, value);
        }
    }
};

const CollectionManager = class extends Wrapper {

    /** @type {Cache} */
    #elements;

    #highlightElement = (id, highlight = true) => {
        if (this.#elements.hasItem(id)) {
            const element = this.#elements.getItem("id");
            if (highlight && !element.hasClass(HIGHLIGHT)) {
                element.addClass(HIGHLIGHT);
            } else if (!highlight && element.hasClass(HIGHLIGHT)) {
                element.removeClass(HIGHLIGHT);
            }
        }
        return this;
    };

    #removeElement = (id) => {
        if (this.#elements.hasItem(id)) {
            this.#elements.getItem(id).remove();
            this.#elements.deleteItem(id);
        }
        return this;
    };

    constructor(classNames) {
        super(classNames);
        this.#elements = new Cache();
    }

    clear() {
        this.#elements.clear();
        super.clear();
        return this;
    }

    /**
     * @param {string} id
     * @param {{visible: boolean, type: string, name: string, info: string, foreground: string, background: string, action: Function}} properties
     */
    updateElement(properties) {

        // before add properties remove = true, highlight = true/false

        // TODO create private methods for all property updates with checks if update is necessary -> property of the element has changed

        const { id } = properties;
        if (isNotEmptyString(id)) {

            /** @type {Container} */
            let element = null;
            if (this.#elements.hasItem(id)) {
                element = this.#elements.getItem(id);
            } else {
                element = new Container("Element");
                // MouseEvent.click applies only to the left mouse button
                element.addEventListener(EventType.mouseup, (event) => EventManager.setInputEvent(event, id));
                this.#elements.setItem(id, element);
                this.addComponent(element);
            }

            const { visible } = properties;
            if (visible === undefined || visible) {

                const { background, name, foreground, information, type } = properties;

                updateClassName(element, type);

                updateTextComponent(element, "Name", getWord(name));

                updateTextComponent(element, "Information", getWord(information));

                updateStyle(element, "color", `rgb(${foreground})`);

                updateStyle(element, "background-color", `rgba(${background}, 0.5)`);

            } else {
                element.hide();
            }

        }
        return this;
    }

    updateElements(elements) {
        if (elements instanceof Array) {
            elements.forEach((element) => this.updateElement(element));
        }
        return this;
    }

};


export default CollectionManager;
