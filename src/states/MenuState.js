
import { hasSaveGame } from "../core/resource_loader.js";

import Menu from "../ui/Menu.js";

import createNewGame from "./createNewGame.js";
import GameStatesManager from "./GameStatesManager.js";


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
                GameStatesManager.notify("done");
                createNewGame();
            });

        if (hasSaveGame()) {
            this.#wrapper.addButton("menuLoadGame", () => {
                GameStatesManager.notify("loadGame");
            });
        }

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        this.#wrapper.clear().remove();
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
