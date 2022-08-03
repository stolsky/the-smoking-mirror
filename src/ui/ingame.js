
import Wrapper from "./wrapper.js";
import Scene from "./scene.js";
import SceneTitle from "./scene_title.js";
import Log from "./log.js";
import Inventory from "./inventory.js";
import Dialog from "./dialog.js";


const InGameUI = class extends Wrapper {

    /** @type {Wrapper} */
    #scene;

    /** @type {Wrapper} */
    #sceneTitle;

    /** @type {Wrapper} */
    #log;

    /** @type {Wrapper} */
    #inventory;

    /** @type {Wrapper} */
    #dialog;

    #event;

    constructor() {

        super("InGameUI");

        this.#event = [];

        this.#scene = new Scene();
        this.#sceneTitle = new SceneTitle();
        this.#log = new Log();
        this.#inventory = new Inventory();
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

    getInputEvent() {
        return this.#event.pop();
    }

};


export default InGameUI;
