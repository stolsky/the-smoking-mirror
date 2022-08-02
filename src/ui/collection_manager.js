
import { hasProperty, isFunction, isNotEmptyString, EventType } from "../../lib/JST/native/type_check.js";
import Container from "../../lib/JST/dom/container.js";
import TextComponent from "../../lib/JST/dom/text_component.js";

import Wrapper from "./wrapper.js";


const HIGHLIGHT = "Highlight";

const CollectionManager = class extends Wrapper {

    #elements;

    #hasElement = (id) => isNotEmptyString(id) && hasProperty(this.#elements, id);

    constructor(classNames) {
        super(classNames);
        this.#elements = {};
    }

    /**
     * @param {string} id
     * @param {{visible: boolean, type: string, name: string, info: string, foreground: string, background: string, action: Function}} properties
     */
    renderElement(id, properties) {
        if (isNotEmptyString(id)) {

            const elem = new Container("Item");

            if (this.#hasElement(id)) {
                this.replaceComponent(elem, this.#elements[`${id}`]);
            } else {
                this.addComponent(elem);
            }

            if (!hasProperty(properties, "visible") || (hasProperty(properties, "visible") && properties.visible)) {

                if (hasProperty(properties, "type")) {
                    elem.addClass(properties.type);
                }

                if (hasProperty(properties, "name") && isNotEmptyString(properties.name)) {
                    elem.addComponent(new TextComponent(properties.name, "Name"));
                }

                if (hasProperty(properties, "info")) {
                    elem.addComponent(new TextComponent(properties.info, "Info"));
                }

                if (hasProperty(properties, "foreground") && isNotEmptyString(properties.foreground)) {
                    elem.setStyle("color", `rgb(${properties.foreground})`);
                }

                if (hasProperty(properties, "background") && isNotEmptyString(properties.background)) {
                    elem.setStyle("background-color", `rgba(${properties.background}, 0.5)`);
                }

                if (hasProperty(properties, "action") && isFunction(properties.action)) {
                    elem.addEventListener(EventType.click, properties.action);
                }

            } else {
                elem.hide();
            }

            this.#elements[`${id}`] = elem;
        }
    }

    highlightElement(id) {
        if (this.#hasElement(id)) {
            this.#elements[`${id}`].addClass(HIGHLIGHT);
        }
    }

    removeHighlights() {
        Object.values(this.#elements).forEach((item) => item.removeClass(HIGHLIGHT));
    }

    remove(id) {
        if (this.#hasElement(id)) {
            this.#elements[`${id}`].remove();
            delete this.#elements[`${id}`];
        }
    }

    clear() {
        this.#elements = {};
        super.clear();
    }

};


export default CollectionManager;
