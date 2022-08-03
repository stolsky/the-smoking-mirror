
const Act = class {

    #name;

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

    /** @returns {Scene} */
    getCurrentScene() {
        return this.#currentScene;
    }

    getName() {
        return this.#name;
    }

    /** @returns {Array<{id: string, name: string, type: string, foreground: string, background: string, information: string, moveable: boolean, visible: boolean}>} */
    getAllElements() {
        const elements = [];
        this.#currentScene.getAllElements().forEach((id) => {

            /** @type {Element} */
            const element = this.#elements.getItem(id);

            elements.push({
                id: element.getId(),
                name: element.getName(),
                type: element.getType(),
                foreground: element.getForeground(),
                background: element.getBackground(),
                information: element.getInformation(),
                moveable: element.isMoveable(),
                visible: element.isVisible()
            });

        });
        return elements;
    }

    loadScene(id) {
        if (this.#elements.hasItem(id)) {
            this.#currentScene = this.#elements.getItem(id);
        }
        return this;
    }

    setActiveHero(id) {
        if (this.#elements.hasItem(id)) {
            this.#activeHero = this.#elements.getItem(id);
        }
        return this;
    }

};


export default Act;
