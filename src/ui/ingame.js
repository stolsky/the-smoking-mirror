
import Wrapper from "./wrapper.js";
import SceneTitle from "./scene_title.js";
import Log from "./log.js";
import Dialog from "./dialog.js";
import CollectionManager from "./collection_manager.js";


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

    #event;

    constructor() {

        super("InGameUI");

        this.#event = [];

        this.#scene = new CollectionManager("Scene");
        this.#sceneTitle = new SceneTitle();
        this.#log = new Log();
        this.#inventory = new CollectionManager("Inventory");
        this.#dialog = new Dialog();

        this.append(
            this.#scene.getContainer(),
            this.#sceneTitle.getContainer(),
            this.#log.getContainer(),
            this.#inventory.getContainer(),
            this.#dialog.getContainer().hide()
        )
            .addAction((event) => {
                this.#event[0] = event;
            });

    }

    addInventory() {

        return this;
    }

    addSceneElements(elements) {
        this.#scene.renderAllElements(elements);
        return this;
    }

    getInputEvent() {
        return this.#event.pop();
    }

    setLog() {

        return this;
    }

    setSceneTitle(title) {
        this.#sceneTitle.setTitle(title);
        return this;
    }
};


export default InGameUI;
