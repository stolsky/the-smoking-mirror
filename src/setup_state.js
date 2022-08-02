
import GameStates from "./game_states.js";
import * as MenuState from "./menu_state.js";


let ready = false;

const enter = () => {

    ready = true;
};

const exit = () => true;

const render = () => true;

const update = () => {
    if (ready) {
        GameStates.pop();
        GameStates.push(MenuState);
    }
};


export {
    enter,
    exit,
    render,
    update
};
