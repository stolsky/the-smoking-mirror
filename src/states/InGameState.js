
import { isBoolean, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import EventManager from "../core/EventManager.js";
import processClick from "../core/interaction.js";

import GameCache from "../am/GameCache.js";
import Act from "../am/Act.js";
import Element from "../am/Element.js";
import Item from "../am/Item.js";

import InGameUI from "../ui/InGameUI.js";

import GameStates from "./GameStates.js";
import MenuState from "./MenuState.js";
import TextPageState from "./TextPageState.js";


const InGameState = class {

    #currentAct;

    #updateSceneElements;

    #updateInventoryElements;

    #updateLog;

    #toRender;

    /** @type {InGameUI} */
    #wrapper;

    // TODO refactor
    /** @param {Array<{text: string, elements: [{id: string, highlight?: boolean, remove?: boolean}]}>} updates  */
    #processUpdates = (updates) => {

        console.log(updates);

        const { text, elements } = updates;

        if (isNotEmptyString(text)) {

            this.#updateLog = { text, narrator: this.#currentAct.getActiveHero().getName() };

        }

        if (elements instanceof Array) {

            elements.forEach((elementProperties) => {

                const { highlight, id, lost, remove } = elementProperties;

                if (lost) {

                    GameStates.pop();
                    GameStates.push(new MenuState());
                    GameStates.push(new TextPageState("GameOver", { title: "gameOver", text: lost }));

                } else {

                    const element = GameCache.getItem(id);
                    const propertiesToUpdate = element.getProperties();

                    if (isBoolean(highlight)) {
                        propertiesToUpdate.highlight = highlight;
                    }

                    if (isBoolean(remove)) {
                        propertiesToUpdate.remove = remove;
                    }

                    if (element instanceof Element) {
                        this.#updateSceneElements.push(propertiesToUpdate);
                    } else if (element instanceof Item) {
                        this.#updateInventoryElements.push(propertiesToUpdate);
                    }

                }

                // TODO enter: string = scene id
                // TODO dialog: string = dialog id -> GameStates.push(new DialogState(dialog))

            });
        }
    };

    #handleInput = (input) => {
        if (input) {

            const { id, left, right } = input;
            const element = GameCache.getItem(id);
            let action = {};

            if (element) {
                if (left) {
                    action = element.getLeftAction();
                } else if (right) {
                    action = element.getRightAction();
                }
            }

            this.#processUpdates(
                processClick(this.#currentAct.getActiveHero(), element, action)
            );
        }
    };

    /**
     * @param {{name: string, start: string, hero: string, elements: Cache}} properties
     */
    constructor(properties) {

        GameCache.append(properties?.elements);

        this.#currentAct = new Act(properties.name)
            .loadScene(properties.start)
            .setActiveHero(properties.hero);

        this.#wrapper = new InGameUI()
            .setSceneTitle(this.#currentAct.getCurrentScene().getName());
        // TODO clear scene before adding elements of another scene

        this.#updateSceneElements = this.#currentAct.getAllElementsProperties();
        this.#updateInventoryElements = [];
        this.#updateLog = null;

        // TODO move between scenes
        // * load elements of new scene
        // * set scene title
        // * reset log if necessary

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        this.#updateSceneElements = null;
        this.#updateInventoryElements = null;
        this.#updateLog = null;

        this.#currentAct.clear();
        this.#currentAct = null;
        GameCache.clear();

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
        this.#handleInput(EventManager.getInputEvent());
    }

};


export default InGameState;
