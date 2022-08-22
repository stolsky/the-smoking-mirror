
import Wrapper from "./Wrapper.js";
import SceneTitle from "./SceneTitle.js";
import Log from "./Log.js";
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

    constructor() {

        super("InGameUI");

        this.#scene = new CollectionManager("Scene");
        this.#sceneTitle = new SceneTitle();
        this.#log = new Log();
        this.#inventory = new CollectionManager("Inventory");

        this.append(
            this.#scene,
            this.#sceneTitle,
            this.#log,
            this.#inventory
        );

        this.addPointerListener();
    }

    clearInventory() {
        this.#inventory.clear();
        return this;
    }

    clearLog() {
        this.#log.clear();
        return this;
    }

    clearScene() {
        this.#scene.clear();
        return this;
    }

    updateInventoryElements(elements) {
        this.#inventory.updateElements(elements);
        return this;
    }

    updateLog(messages) {
        this.#log.append(messages);
        return this;
    }

    updateSceneElements(elements) {
        this.#scene.updateElements(elements);
        return this;
    }

    setSceneTitle(title) {
        this.#sceneTitle.setTitle(title);
        return this;
    }

};


export default InGameUI;
