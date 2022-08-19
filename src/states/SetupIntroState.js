
import GameStatesManager from "./GameStatesManager.js";
import State from "./State.js";


const SetupIntroState = class extends State {

    #isDone;

    constructor() {
        super();

        this.#isDone = true;
    }

    /** @override */
    update() {
        if (this.#isDone) {
            GameStatesManager
                .notify("done")
                .notify("mainMenu");
        }
    }

};


export default SetupIntroState;
