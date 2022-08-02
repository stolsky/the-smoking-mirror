
import { getWord } from "../lib/JST/resource/lang.js";

import Menu from "./ui/menu.js";
import GameStates from "./game_states.js";
import InGameState from "./ingame_state.js";


/** @type {Menu} */
let menu = null;
let mustRender = false;

const enter = () => {

    menu = new Menu();
    menu.setTitle(getWord("GameTitle"));
    menu.setSubTitle(getWord("GameSubTitle"));
    menu.setDisclaimer(getWord("menuDisclaimer"));
    menu.addButton(getWord("menuNewGame"), () => {
        GameStates.pop();
        GameStates.push(InGameState);
    });

    mustRender = true;
};

const exit = () => {
    menu = null;
    mustRender = true;
};

const render = (ctx) => {
    if (mustRender) {
        ctx.addComponent(menu.getContainer());
        mustRender = false;
    }
};

const update = () => true;


export {
    enter,
    exit,
    render,
    update
};
