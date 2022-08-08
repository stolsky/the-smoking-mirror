
import { EventType } from "../../lib/JST/native/typeCheck.js";

import EventManager from "../core/InputEventManager.js";
import getWord from "../core/translate.js";

import Wrapper from "./Wrapper.js";
import SceneTitle from "./SceneTitle.js";
import Log from "./Log.js";
import Dialog from "./Dialog.js";
import CollectionManager from "./CollectionManager.js";


const InGameUI = class extends Wrapper {

    /** @type {CollectionManager} */
    #scene;

    /** @type {Wrapper} */
    #sceneTitle;

    /** @type {Wrapper} */
    #log;

    /** @type {CollectionManager} */
    #inventory;

    /** @type {Wrapper} */
    #dialog;

    constructor() {

        super("InGameUI");

        this.#scene = new CollectionManager("Scene");
        this.#sceneTitle = new SceneTitle();
        this.#log = new Log();
        this.#inventory = new CollectionManager("Inventory");
        this.#dialog = new Dialog();

        this.append(
            this.#scene,
            this.#sceneTitle,
            this.#log,
            this.#inventory,
            this.#dialog.hide()
        );

        this.addEventListener(EventType.mouseup, (event) => EventManager.setInputEvent(event));
    }

    clearScene() {
        this.#scene.clear();
    }

    updateInventoryElements(elements) {
        this.#inventory.updateElements(elements);
        return this;
    }

    updateLog(message) {
        this.#log.add(message);
        return this;
    }

    updateSceneElements(elements) {
        this.#scene.updateElements(elements);
        return this;
    }

    setSceneTitle(title) {
        this.#sceneTitle.setTitle(getWord(title));
        return this;
    }

};


export default InGameUI;
