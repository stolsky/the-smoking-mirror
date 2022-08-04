
import { isNotEmptyString, EventType } from "../../lib/JST/native/typeCheck.js";
import Cache from "../../lib/JST/resource/Cache.js";
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import EventManager from "../core/EventManager.js";
import Wrapper from "./Wrapper.js";


const HIGHLIGHT = "Highlight";

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

    highlightElement(id) {
        if (this.#elements.hasItem(id)) {
            this.#elements.getItem("id").addClass(HIGHLIGHT);
        }
        return this;
    }

    remove(id) {
        if (this.#elements.hasItem(id)) {
            this.#elements.getItem(id).remove();
            this.#elements.deleteItem(id);
        }
        return this;
    }

    /**
     * @param {*} highlightedElementIDs
     *
     * @returns {CollectionManager}
     */
    removeHighlights(highlightedElementIDs) {
        if (highlightedElementIDs instanceof Array) {
            highlightedElementIDs.forEach((id) => this.#elements.getItem(id).removeClass(HIGHLIGHT));
        }
        //this.#elements.filterValues((value) => value.hasClass(HIGHLIGHT)).forEach((value) => value.removeClass(HIGHLIGHT));
        return this;
    }

    /**
     * @param {string} id
     * @param {{visible: boolean, type: string, name: string, info: string, foreground: string, background: string, action: Function}} properties
     */
    updateElement(properties) {

        const { id } = properties;
        if (isNotEmptyString(id)) {

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

                if (type) {
                    element.addClass(type);
                }

                if (isNotEmptyString(name)) {
                    element.addComponent(new TextComponent(name, "Name"));
                }

                if (information) {
                    element.addComponent(new TextComponent(information, "Information"));
                }

                if (isNotEmptyString(foreground)) {
                    element.setStyle("color", `rgb(${foreground})`);
                }

                if (isNotEmptyString(background)) {
                    element.setStyle("background-color", `rgba(${background}, 0.5)`);
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
