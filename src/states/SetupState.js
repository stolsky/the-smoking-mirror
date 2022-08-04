
import GameStates from "./GameStates.js";
import MenuState from "./MenuState.js";


const SetupState = class {

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
            GameStates.pop();
            GameStates.push(new MenuState());
        }
    }
};


export default SetupState;
