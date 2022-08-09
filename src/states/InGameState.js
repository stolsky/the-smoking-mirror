
import { isBoolean, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import EventManager from "../core/InputEventManager.js";
import processClick from "../core/processClick.js";

import Act from "../am/Act.js";
import Element from "../am/Element.js";
import Item from "../am/Item.js";

import InGameUI from "../ui/InGameUI.js";

import GameStatesManager from "./GameStatesManager.js";


const InGameState = class {

    #currentAct;

    #updateSceneElements;

    #updateInventoryElements;

    #updateLog;

    #toRender;

    /** @type {InGameUI} */
    #wrapper;

    #enterScene(id) {

        this.#currentAct.loadScene(id);
        this.#wrapper
            .setSceneTitle(this.#currentAct.getCurrentScene().getName())
            .clearScene();
        this.#updateSceneElements = this.#currentAct.getAllElementsProperties();

        // TODO add scene description if exists
        // reset log if necessary
    }

    /** @param {Array<{text: string, elements: [{enter?: string, highlight?: boolean, id?: string, lost?: string, remove?: boolean}]}>} */
    #processUpdates({ text, elements }) {

        // console.log(text, elements);

        if (isNotEmptyString(text)) {
            this.#updateLog = { text, narrator: this.#currentAct.getActiveHero().getName() };
        }

        if (elements instanceof Array) {

            elements.forEach(({ enter, highlight, id, lost, remove }) => {

                if (isNotEmptyString(enter)) {

                    GameStatesManager.notify("transition", { name: "InOut" });
                    this.#enterScene(enter);

                } else if (lost) {

                    GameStatesManager
                        .notify("done")
                        .notify("menuMenu")
                        .notify("textPage", { name: "GameOver", title: "gameOver", text: lost });

                } else if (id) {

                    const element = Act.getElement(id);
                    const propertiesToUpdate = element.getProperties();

                    if (isBoolean(highlight)) {
                        propertiesToUpdate.highlight = highlight;
                    }

                    if (isBoolean(remove)) {
                        propertiesToUpdate.remove = remove;
                        Act.removeElement(id);
                    }

                    if (element instanceof Element) {
                        this.#updateSceneElements.push(propertiesToUpdate);
                    } else if (element instanceof Item) {
                        this.#updateInventoryElements.push(propertiesToUpdate);
                    }

                }

                // TODO dialog: string = dialog id -> GameStates.push(new DialogState(dialog))

            });
        }
    }

    #handleInput({ id, left, right }) {

        const element = Act.getElement(id);
        let action = {};

        if (element) {
            if (left) {
                action = element.getLeftAction();
            } else if (right) {
                action = element.getRightAction();
            }
        }

        this.#processUpdates(processClick(this.#currentAct.getActiveHero(), element, action));
    }

    /**
     * @param {{name: string, start: string, hero: string, elements: Cache}}
     */
    constructor({ name, start, hero, elements }) {

        this.#currentAct = new Act({ name, elements }).setActiveHero(hero);
        this.#wrapper = new InGameUI();
        this.#enterScene(start);

        // TODO fill inventory with previuos inventory
        this.#updateInventoryElements = [];
        this.#updateLog = null;

        this.#toRender = true;
    }

    enter() {
        GameStatesManager.notify("transition", { name: "Out" });
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
        if (this.#updateLog !== null) {
            this.#wrapper.updateLog(this.#updateLog);
            this.#updateLog = null;
        }
    }

    update() {
        const input = EventManager.getInputEvent();
        if (input) {
            this.#handleInput(input);
        }
    }

};


export default InGameState;
