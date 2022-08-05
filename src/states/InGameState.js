
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import EventManager from "../core/EventManager.js";
import processClick from "../core/interaction.js";

import GameCache from "../am/GameCache.js";
import Act from "../am/Act.js";

import InGameUI from "../ui/InGameUI.js";


// const renderDeath = (id) => {
//     Overlay.setTitle(createMessage("deathTitle"));
//     Overlay.setText(createMessage(id));
//     // Overlay.setCallback();
//     Overlay.show();
// };

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

        const { text, elements } = updates;

        if (isNotEmptyString(text)) {

            // TODO insert: BUT no getWord -> move all the IDs to UI
            // const createMessage = (id) => id.split("+").reduce((acc, part) => `${acc} ${getWord(part)}`, "");
            // /** @param {Object} message */
            // const addMessage = (message) => {
            //     if (message && hasProperty(message, "text") && isString(message.text)) {

            //         const text = createMessage(message.text);

            //         let narrator = null;
            //         if (hasProperty(message, "narrator")) {
            //             narrator = getWord(message.narrator);
            //         }

            //         Log.add(text, narrator);
            //     }
            // };
            // this.nextMessage = { text };//, narrator);
        }

        if (elements instanceof Array) {

            elements.forEach((element) => {

                console.log(element);

                const { id, item, remove } = element;

                if (isNotEmptyString(id) && GameCache.hasItem(id)) {
                    this.#updateSceneElements.push(Act.getElement(id).getProperties());
                }

                if (isNotEmptyString(item)) {
                    this.#updateInventoryElements.push(Act.getElement(item).getProperties());
                    // add item to hero's inventory
                    this.#currentAct.getActiveHero().getInventory().addItem(item);
                }

                if (isNotEmptyString(remove)) {
                    this.#updateSceneElements.push({ ...Act.getElement(remove).getProperties(), remove: true });
                }

                // enter: string = scene id
                // dialog: string = dialog id -> GameStates.push(new DialogState(dialog))
                // lost: string = text id -> GameStates.pop(); GameStates.push(new GameOverState())
                // highlight: boolean

            });
        }
    };

    #handleInput = (input) => {
        if (input) {
            const { id, left, right } = input;

            /** @type {Array<string>} Array with all element IDs that need to be updated. */
            let updates = [];

            const element = (isNotEmptyString(id)) ? Act.getElement(id) : null;

            if (left) {
                updates = processClick(element || null, element?.getLeftAction() || null);
            } else if (right) {
                updates = processClick(element || null, element?.getRightAction() || null);
            }

            this.#processUpdates(updates);
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
        return this;
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
