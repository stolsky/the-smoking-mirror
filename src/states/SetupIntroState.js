
import GameStatesManager from "./GameStatesManager.js";


const SetupIntroState = class {

    #is_ready;

    constructor() {

        // load resources

        this.#is_ready = true;
    }

    enter() {
        return this;
    }

    exit() {
        return this;
    }

    render() {
        this.#is_ready = false;
    }

    update() {
        if (this.#is_ready) {
            GameStatesManager
                .notify("done")
                .notify("mainMenu");
        }
    }
};


export default SetupIntroState;
