
import { hasProperty } from "../../lib/JST/native/type_check.js";
import Cache from "../../lib/JST/resource/cache.js";

import Menu from "../ui/menu.js";
import GameStates from "./game_states.js";
import LoadGameState from "./load_game_state.js";
import InGameState from "./ingame_state.js";
import GameIntroState from "./game_intro_state.js";
import { hasSaveGame, loadActScript, loadItems, loadScenes } from "../resource_loader.js";
import { parseFlags, parseHeroes, parseItems, parseScenes } from "../resource_parser.js";
import getWord from "../translate.js";


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
                loadActScript("paris1").then((script) => {
                    GameStates.pop();

                    const elements = new Cache();
                    elements.append(parseFlags(script.flags.split(",")));
                    elements.append(parseHeroes(script.heroes));
                    Promise.all([loadItems(), loadScenes(script.scenes.split(","))]).then((result) => {

                        elements.append(parseItems(result[0]));
                        elements.append(parseScenes(result[1]));

                        GameStates.push(new InGameState({ name: script.name, start: script.start, hero: script.active, elements }));

                        if (hasProperty(script, "intro")) {
                            GameStates.push(new GameIntroState(script.intro));
                        }
                    });
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
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        // calculate animations
        return this;
    }

};


export default MenuState;
