
import { EventType, isNotEmptyString, isString } from "../../lib/JST/native/typeCheck.js";
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
    if (!element.hasClass(className)) {
        // TODO replace class type not add it
        element.addClass(className);
    }
};

const updateText = (element, text) => {
    if (element.getText() !== text) {
        element.setText(text);
    }
};

const updateName = (parent, id) => {
    updateText(parent.getChildren()[0], getWord(id));
};

const updateInformation = (parent, id) => {
    updateText(parent.getChildren()[1], getWord(id));
};

/**
 * @param {Container} element
 * @param {string} cssProperty
 * @param {string} value
 */
const updateStyle = (element, key, value) => {
    if (isNotEmptyString(value)) {
        //if (element.getStyle(key) !== value) {
            element.setStyle(key, value);
        //}
    }
};

const updateForeground = (element, rgbValue) => {
    updateStyle(element, "color", `rgb(${rgbValue})`);
};

const updateBckground = (element, rgbValue) => {
    updateStyle(element, "background-color", `rgba(${rgbValue}, 0.5)`);
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

        console.log(properties);

        // TODO create private methods for all property updates with checks if update is necessary -> property of the element has changed

        const { id } = properties;
        if (isNotEmptyString(id)) {

            /** @type {Container} */
            let element = null;
            if (this.#elements.hasItem(id)) {
                element = this.#elements.getItem(id);
            } else {

                element = new Container("Element")
                    .append(new TextComponent("", "Name"), new TextComponent("", "Information"))
                    // MouseEvent.click applies only to the left mouse button
                    .addEventListener(EventType.mouseup, (event) => EventManager.setInputEvent(event, id));

                this.#elements.setItem(id, element);
                this.addComponent(element);
            }

            const { visible } = properties;
            if (visible === undefined || visible) {

                element.show();

                const { background, name, foreground, information, type } = properties;

                if (isNotEmptyString(type)) {
                    updateClassName(element, type);
                }

                if (isNotEmptyString(type)) {
                    updateName(element, name);
                }

                if (isString(information)) {
                    updateInformation(element, information);
                }

                // TODO improve rgb values
                if (isNotEmptyString(foreground)) {
                    updateForeground(element, foreground);
                }

                if (isNotEmptyString(background)) {
                    updateBckground(element, background);
                }

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
