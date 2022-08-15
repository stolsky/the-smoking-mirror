
import { isBoolean, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import InputEventManager from "../core/InputEventManager.js";
import processClick from "../core/processClick.js";

import Act from "../am/Act.js";
import Element from "../am/Element.js";
import Item from "../am/Item.js";

import InGameUI from "../ui/InGameUI.js";

import GameStatesManager from "./GameStatesManager.js";
import GameCache, { getActiveHero, setActiveHero } from "../am/GameCache.js";


const loadGameOver = (text) => GameStatesManager
    .notify("done")
    .notify("mainMenu")
    .notify("textPage", { name: "GameOver", title: "gameOver", text });

const InGameState = class {

    #currentAct;

    /** @type {Array} */
    #updateSceneElements;

    /** @type {Array} */
    #updateInventoryElements;

    /** @type {Array} */
    #updateLog;

    #toRender;

    /** @type {InGameUI} */
    #wrapper;

    #displaySceneIntro() {
        const intro = this.#currentAct.getCurrentScene().getIntro();
        if (intro) {
            this.#updateLog.push({ text: intro, narrator: getActiveHero().getName() });
        }
    }

    #enterScene(id) {

        this.#currentAct.loadScene(id);
        this.#wrapper
            .setSceneTitle(this.#currentAct.getCurrentScene().getName())
            .clearScene();
        this.#updateSceneElements = this.#currentAct.getAllElementsProperties();

        this.#displaySceneIntro();
    }

    #collectElementDataForUIUpdate({ element, highlight, remove }) {

        const loadedElement = this.#currentAct.getElement(element);
        if (loadedElement) {

            const propertiesToUpdate = loadedElement.getProperties();

            if (isBoolean(highlight)) {
                propertiesToUpdate.highlight = highlight;
            }

            if (isBoolean(remove)) {
                propertiesToUpdate.remove = remove;
                this.#currentAct.removeElement(element);
            }

            if (loadedElement instanceof Element) {
                this.#updateSceneElements.push(propertiesToUpdate);
            } else if (loadedElement instanceof Item) {
                this.#updateInventoryElements.push(propertiesToUpdate);
            }
        }

    }

    /** @param {Array<{text: string, elements: [{enter?: string, highlight?: boolean, id?: string, lost?: string, remove?: boolean}]}>} */
    #processChanges({ text, elements }) {

        // console.log(text, elements);
        // console.log(getActiveHero());

        if (isNotEmptyString(text)) {
            this.#updateLog.push({ text, narrator: getActiveHero().getName() });
        }

        if (elements instanceof Array) {

            elements.forEach(({ dialog, enter, highlight, element, lost, remove }) => {

                if (isNotEmptyString(enter)) {
                    GameStatesManager.notify("transition", ["In", () => this.#enterScene(enter), "Out"]);
                    // TODO add information about which location I have entered
                } else if (lost) {
                    loadGameOver(lost);
                } else if (isNotEmptyString(element)) {
                    this.#collectElementDataForUIUpdate({ element, highlight, remove });
                }

                if (isNotEmptyString(dialog)) {
                    GameStatesManager.notify("dialog", dialog);
                }

            });
        }
    }

    #handleInput({ id, buttons }) {
        this.#processChanges(processClick({
            element: id,
            buttons
        }));
    }

    /**
     * @param {{name: string, start: string, hero: string, elements: Cache}}
     */
    constructor({ name, start, hero, elements }) {

        this.#updateSceneElements = [];
        this.#updateInventoryElements = [];
        this.#updateLog = [];

        this.#currentAct = new Act({ name, elements });
        this.#wrapper = new InGameUI();
        setActiveHero(hero);
        this.#enterScene(start);

        this.#toRender = true;
    }

    enter() {
        // GameStatesManager.notify("transition", ["Out"]);
        GameCache.getItem("telephone").setCurrentState(2);
        this.#enterScene("oubier2");
        return this;
    }

    exit() {
        this.#updateSceneElements = null;
        this.#updateInventoryElements = null;
        this.#updateLog = null;

        this.#currentAct.clear();
        this.#currentAct = null;

        this.#wrapper.clear().remove();
        this.#wrapper = null;
        this.#toRender = false;
    }

    render(ctx) {
        if (this.#toRender) {
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }

        if (this.#updateSceneElements.length > 0) {
            this.#wrapper.updateSceneElements(this.#updateSceneElements);
            this.#updateSceneElements = [];
        }

        if (this.#updateInventoryElements.length > 0) {
            this.#wrapper.updateInventoryElements(this.#updateInventoryElements);
            this.#updateInventoryElements = [];
        }

        if (this.#updateLog.length > 0) {
            this.#wrapper.updateLog(this.#updateLog);
            this.#updateLog = [];
        }
    }

    update() {
        const input = InputEventManager.getInputEvent();
        if (input) {
            this.#handleInput(input);
        }
    }

};


export default InGameState;
