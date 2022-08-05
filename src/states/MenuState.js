
import { hasProperty, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Cache from "../../lib/JST/resource/Cache.js";

import { hasSaveGame, loadActScript, loadItems, loadScenes } from "../core/resource_loader.js";
import { importFlags, importHeroes, importItems, importScenes } from "../core/resource_importer.js";

import Menu from "../ui/Menu.js";

import GameStates from "./GameStates.js";
import LoadGameState from "./LoadGameState.js";
import InGameState from "./InGameState.js";
import GameIntroState from "./GameIntroState.js";


const MenuState = class {

    #toRender;

    /** @type {Menu} */
    #wrapper;

    constructor() {

        this.#wrapper = new Menu()
            .setTitle("GameTitle")
            .setSubTitle("GameSubTitle")
            .setDisclaimer("menuDisclaimer")
            .addButton("menuNewGame", () => {
                loadActScript("paris1").then((script) => {

                    GameStates.pop();

                    const { active, flags, heroes, intro, name, scenes, start } = script;
                    const elements = new Cache();
                    if (isNotEmptyString(flags)) {
                        elements.append(importFlags(flags.split(",")));
                    }
                    elements.append(importHeroes(heroes));
                    Promise.all([loadItems(), loadScenes(scenes.split(","))]).then((result) => {

                        elements.append(importItems(result[0]));
                        elements.append(importScenes(result[1]));
                        GameStates.push(new InGameState({ name, start, hero: active, elements }));

                        if (hasProperty(script, "intro")) {
                            GameStates.push(new GameIntroState(intro));
                        }
                    });
                });
            });

        if (hasSaveGame()) {
            this.#wrapper.addButton("menuLoadGame", () => {
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
