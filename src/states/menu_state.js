
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
                loadScript("paris1").then((script) => {
                    GameStates.pop();
                    GameStates.push(new InGameState(script, script.start));
                    if (hasProperty(script, "intro")) {
                        GameStates.push(new GameIntroState(script.intro));
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
