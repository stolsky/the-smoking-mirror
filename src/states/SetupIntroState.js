
import GameStatesManager from "./GameStatesManager.js";


const SetupIntroState = class {

    #isDone;

    constructor() {

        // load resources

        this.#isDone = true;
    }

    enter() {
        return this;
    }

    exit() {
        return this;
    }

    render() {
        this.#isDone = false;
    }

    update() {
        if (this.#isDone) {
            GameStatesManager
                .notify("done")
                .notify("mainMenu");
        }
    }
};


export default SetupIntroState;
