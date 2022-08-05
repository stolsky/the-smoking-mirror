
import GameCache from "./GameCache.js";


const Act = class {

    #name;

    /** @type {Hero} */
    #activeHero;

    /** @type {Scene} */
    #currentScene;

    /**
     * @param {string} name
     * @param {Cache} elements
     */
    constructor(name) {
        this.#name = name;
        this.#activeHero = null;
        this.#currentScene = null;
    }

    static getElement(id) {
        return GameCache.getItem(id);
    }

    getActiveHero() {
        return this.#activeHero;
    }

    /** @returns {Array<{id: string, name: string, type?: string, foreground: string, background: string, information: string, moveable?: boolean, visible?: boolean}>} */
    getAllElementsProperties() {
        const elements = [];
        this.#currentScene.getAllElements().forEach((id) => elements.push(Act.getElement(id).getProperties()));
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
            this.#currentScene = Act.getElement(id);
        }
        return this;
    }

    setActiveHero(id) {
        if (GameCache.hasItem(id)) {
            this.#activeHero = Act.getElement(id);
        }
        return this;
    }

};


export default Act;
