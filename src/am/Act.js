
import GameCache from "./GameCache.js";
import Element from "./Element.js";
import Item from "./Item.js";


const Act = class {

    #name;

    /** @type {Scene} */
    #currentScene;

    /** @param {{ name?: string, elements?: Cache }} */
    constructor({ name, elements }) {
        this.#name = name;
        this.#currentScene = null;
        GameCache.append(elements);
    }

    clear() {
        this.#name = null;
        this.#currentScene = null;
        GameCache.clear();
        return this;
    }

    /** @returns {Array<{id: string, name: string, type?: string, foreground: string, background: string, information: string, moveable?: boolean, visible?: boolean}>} */
    getAllElementsProperties() {
        const elements = [];
        this.#currentScene.getAllElements().forEach((id) => {
            if (GameCache.hasItem(id)) {
                elements.push(GameCache.getItem(id).getProperties());
            }
        });
        return elements;
    }

    /** @returns {Scene} */
    getCurrentScene() {
        return this.#currentScene;
    }

    /** Returns the element to the specified id if it belongs to the current scene.
     *
     * @param {string} id
     *
     * @returns {Element | Item}
     */
    getElement(id) {
        const object = GameCache.getItem(id);
        if ((object instanceof Element && this.#currentScene.hasElement(id)) || object instanceof Item) {
            return object;
        }
        return null;
    }

    getName() {
        return this.#name;
    }

    loadScene(id) {
        if (GameCache.hasItem(id)) {
            this.#currentScene = GameCache.getItem(id);
        }
        return this;
    }

    removeElement(id) {
        this.#currentScene.removeElement(id);
        GameCache.deleteItem(id);
    }

};


export default Act;
