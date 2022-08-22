
import { isBoolean, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";

import processClick from "../core/processClick.js";

import Act from "../am/Act.js";
import Element from "../am/Element.js";
import Item from "../am/Item.js";
import GameCache, { getActiveHero, setActiveHero } from "../am/GameCache.js";

import InGameUI from "../ui/InGameUI.js";

import GameStatesManager from "./GameStatesManager.js";
import State from "./State.js";


const loadEndOfDemo = () => GameStatesManager
    .notify("done")
    .notify("mainMenu")
    .notify("textPage", { name: "GameOver", title: "demoOver", text: "demoOverThanks" });

const loadGameOver = (text) => GameStatesManager
    .notify("done")
    .notify("mainMenu")
    .notify("textPage", { name: "GameOver", title: "gameOver", text });

const InGameState = class extends State {

    #currentAct;

    #displaySceneIntro() {
        const intro = this.#currentAct.getCurrentScene().getIntro();
        if (intro) {
            this.pushQueueData("log", { text: intro, narrator: getActiveHero().getName() });
        }
    }

    #enterScene(id) {

        this.#currentAct.loadScene(id);

        // console.log(this.getUI());
        this.getUI()
            .setSceneTitle(this.#currentAct.getCurrentScene().getName())
            .clearScene();

        this.pushQueueData("scene", this.#currentAct.getAllElementsProperties());

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
                this.pushQueueData("scene", propertiesToUpdate);
            } else if (loadedElement instanceof Item) {
                this.pushQueueData("inventory", propertiesToUpdate);
            }
        }

    }

    /** @param {Array<{text: string, elements: [{enter?: string, highlight?: boolean, id?: string, lost?: string, remove?: boolean}]}>} */
    #processChanges({ text, elements }) {

        // console.log(text, elements);
        // console.log(getActiveHero());

        if (isNotEmptyString(text)) {
            this.pushQueueData("log", { text, narrator: getActiveHero().getName() });
        }

        if (elements instanceof Array) {

            elements.forEach(({ dialog, enter, highlight, element, lost, remove }) => {

                if (isNotEmptyString(enter)) {
                    // TODO branch only for DEVELOPMENT
                    if (!GameCache.hasItem(enter)) {
                        loadEndOfDemo();
                    } else {
                        GameStatesManager.notify("transition", ["ShowAnimation", () => this.#enterScene(enter), "HideAnimation"]);
                    }
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

    /**
     * @param {{name: string, start: string, hero: string, elements: Cache}}
     */
    constructor({ name, start, hero, elements }) {

        super();

        this.addDataQueue("scene", "updateSceneElements")
            .addDataQueue("inventory", "updateInventoryElements")
            .addDataQueue("log", "updateLog")
            .setUI(new InGameUI())
            .setInputHandler(({ id, buttons }) => this.#processChanges(processClick({ element: id, buttons })));

        this.#currentAct = new Act({ name, elements });
        setActiveHero(hero);
        this.#enterScene(start);

        // TODO DEVELOPMENT ONLY
        this.jumpToLocation = true;
    }

    /** @override */
    enter() {
        // GameStatesManager.notify("transition", ["HideAnimation"]);
        // return this;
    }

    // TODO DEVELOPMENT ONLY
    update() {
        super.update();
        if (this.jumpToLocation) {
            GameCache.getItem("telephone").setCurrentState(2);
            GameCache.getItem("cafeExit").setVisibility(true);
            this.#enterScene("oubier2");
            this.jumpToLocation = false;
        }
    }

    /** @override */
    exit() {
        this.#currentAct.clear();
        this.#currentAct = null;

        super.exit();
    }

};


export default InGameState;
