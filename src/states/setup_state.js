
import GameStates from "./game_states.js";
import MenuState from "./menu_state.js";


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
