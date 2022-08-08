
import { EventType, isBoolean, isNotEmptyString, isString } from "../../lib/JST/native/typeCheck.js";
import Cache from "../../lib/JST/resource/Cache.js";
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import EventManager from "../core/InputEventManager.js";
import getWord from "../core/translate.js";

import Wrapper from "./Wrapper.js";


const HIGHLIGHT = "Highlight";

// TODO improve update methods -> only update if something has changed

const updateClassName = (element, className) => {
    element.addClass(className);
};

const updateText = (element, text) => {
    element.setText(text);
};

const updateName = (parent, id) => {
    updateText(parent.getChildren()[0], getWord(id));
};

const updateInformation = (parent, id) => {
    updateText(parent.getChildren()[1], getWord(id));
};

const updateHighlight = (element, highlight) => {
    if (highlight && !element.hasClass(HIGHLIGHT)) {
        element.addClass(HIGHLIGHT);
    } else if (!highlight && element.hasClass(HIGHLIGHT)) {
        element.removeClass(HIGHLIGHT);
    }
};

/**
 * @param {Container} element
 * @param {string} cssProperty
 * @param {string} value
 */
const updateStyle = (element, key, value) => {
    element.setStyle(key, value);
};

const updateBackground = (element, rgbValue) => {
    updateStyle(element, "background-color", `rgba(${rgbValue}, 0.5)`);
};
const updateForeground = (element, rgbValue) => {
    updateStyle(element, "color", `rgb(${rgbValue})`);
};

const CollectionManager = class extends Wrapper {

    /** @type {Cache} */
    #elements;

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

        //console.log(properties);

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

            const { visible, remove } = properties;
            if (remove) {

                this.#elements.deleteItem(id);
                element.remove();

            } else if (visible === undefined || visible) {

                element.show();

                const { background, foreground, highlight, information, name, type } = properties;

                if (isNotEmptyString(background)) {
                    updateBackground(element, background);
                }

                // TODO improve rgb values
                if (isNotEmptyString(foreground)) {
                    updateForeground(element, foreground);
                }

                if (isBoolean(highlight)) {
                    updateHighlight(element, highlight);
                }


                if (isString(information)) {
                    updateInformation(element, information);
                }

                if (isNotEmptyString(name)) {
                    updateName(element, name);
                }


                if (isNotEmptyString(type)) {
                    updateClassName(element, type);
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
