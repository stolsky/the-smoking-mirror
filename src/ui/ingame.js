
import Wrapper from "./wrapper.js";
import Scene from "./scene.js";
import SceneTitle from "./scene_title.js";
import Log from "./log.js";
import Inventory from "./inventory.js";
import Dialogue from "./dialogue.js";


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
    #dialogue;

    #event;

    constructor() {

        super("InGameUI");

        this.#event = [];

        this.#scene = new Scene();
        this.#sceneTitle = new SceneTitle();
        this.#log = new Log();
        this.#inventory = new Inventory();
        this.#dialogue = new Dialogue();

        this.append(
            this.#scene.getContainer(),
            this.#sceneTitle.getContainer(),
            this.#log.getContainer(),
            this.#inventory.getContainer(),
            this.#dialogue.getContainer().hide()
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
