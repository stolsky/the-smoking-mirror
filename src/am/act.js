
import getWord from "../translate.js";


const Act = class {

    #name;

    /** @type {Cache} */
    #elements;

    /** @type {Hero} */
    #activeHero;

    /** @type {Scene} */
    #currentScene;

    /**
     * @param {string} name
     * @param {Cache} elements
     */
    constructor(name, elements = null) {
        this.#name = name;
        this.#elements = elements;
    }

    getActiveHero() {
        return this.#activeHero;
    }

    /** @returns {Array<{id: string, name: string, type: string, foreground: string, background: string, information: string, moveable: boolean, visible: boolean}>} */
    getAllElements() {
        const elements = [];
        this.#currentScene.getAllElements().forEach((id) => {
            /** @type {Element} */
            const element = this.getElement(id);
            elements.push({
                id: element.getId(),
                name: getWord(element.getName()),
                type: element.getType(),
                foreground: element.getForeground(),
                background: element.getBackground(),
                information: getWord(element.getInformation()),
                moveable: element.isMoveable(),
                visible: element.isVisible()
            });
        });
        return elements;
    }

    /** @returns {Scene} */
    getCurrentScene() {
        return this.#currentScene;
    }

    getElement(id) {
        return this.#elements.getItem(id);
    }

    getName() {
        return this.#name;
    }

    loadScene(id) {
        if (this.#elements.hasItem(id)) {
            this.#currentScene = this.getElement(id);
        }
        return this;
    }

    setActiveHero(id) {
        if (this.#elements.hasItem(id)) {
            this.#activeHero = this.getElement(id);
        }
        return this;
    }

};


export default Act;
