
import GameStates from "./game_states.js";
import * as MenuState from "./menu_state.js";


let ready = false;

const enter = () => {
    // load resources
    ready = true;
};

const exit = () => {

};

const renderer = (ctx) => {

};

const update = (dt) => {
    if (ready) {
        GameStates.pop();
        GameStates.push(MenuState);
    }
};


export {
    enter,
    exit,
    renderer,
    update
};
