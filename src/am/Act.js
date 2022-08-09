
import GameCache from "./GameCache.js";


const Act = class {

    #name;

    /** @type {Hero} */
    #activeHero;

    /** @type {Scene} */
    #currentScene;

    /** @param {{ name?: string, elements?: Cache }} */
    constructor({ name, elements }) {
        this.#name = name;
        this.#activeHero = null;
        this.#currentScene = null;
        GameCache.append(elements);
    }

    static getElement(id) {
        return GameCache.getItem(id);
    }

    static removeElement(id) {
        GameCache.deleteItem(id);
    }

    clear() {
        this.#name = null;
        this.#activeHero = null;
        this.#currentScene = null;
        GameCache.clear();
        return this;
    }

    getActiveHero() {
        return this.#activeHero;
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

    getName() {
        return this.#name;
    }

    loadScene(id) {
        if (GameCache.hasItem(id)) {
            this.#currentScene = GameCache.getItem(id);
        }
        return this;
    }

    setActiveHero(id) {
        if (GameCache.hasItem(id)) {
            this.#activeHero = GameCache.getItem(id);
        }
        return this;
    }

};


export default Act;
