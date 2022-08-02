
import { hasProperty } from "../../lib/JST/native/type_check.js";

import Menu from "../ui/menu.js";
import GameStates from "./game_states.js";
import LoadGameState from "./load_game_state.js";
import InGameState from "./ingame_state.js";
import GameIntroState from "./game_intro_state.js";
import { getWord, hasSaveGame, loadScript } from "./load_scripts.js";


const MenuState = class {

    #toRender;

    /** @type {Menu} */
    #wrapper;

    constructor() {

        this.#wrapper = new Menu()
            .setTitle(getWord("GameTitle"))
            .setSubTitle(getWord("GameSubTitle"))
            .setDisclaimer(getWord("menuDisclaimer"))
            .addButton(getWord("menuNewGame"), () => {
                loadScript("paris1").then((script_data) => {
                    GameStates.pop();
                    GameStates.push(new InGameState(script_data));
                    if (hasProperty(script_data, "intro")) {
                        GameStates.push(new GameIntroState(script_data.intro));
                    }
                });
            });

        if (hasSaveGame()) {
            this.#wrapper.addButton(getWord("menuLoadGame"), () => {
                GameStates.push(new LoadGameState());
            });
        }

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        this.#wrapper.remove();
        this.#wrapper = null;
        this.#toRender = false;
    }

    render(ctx) {
        if (this.#toRender) {
            ctx.addComponent(this.#wrapper.getContainer());
            this.#toRender = false;
        }
    }

    update() {
        // calculate animations
        return this;
    }

};


export default MenuState;
