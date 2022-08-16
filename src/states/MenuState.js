
import { hasSaveGame } from "../core/resource_loader.js";

import Menu from "../ui/Menu.js";

import createNewGame from "./createNewGame.js";
import GameStatesManager from "./GameStatesManager.js";


const MenuState = class {

    #toRender;

    /** @type {Menu} */
    #ui;

    constructor() {

        this.#ui = new Menu()
            .setTitle("GameTitle")
            .setSubTitle("GameSubTitle")
            .setDisclaimer("menuDisclaimer")
            .addButton("menuNewGame", () => {
                GameStatesManager.notify("done");
                createNewGame();
            });

        if (hasSaveGame()) {
            this.#ui.addButton("menuLoadGame", () => {
                GameStatesManager.notify("loadGame");
            });
        }

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        this.#ui.clear().remove();
        this.#ui = null;
        this.#toRender = false;
    }

    render(ctx) {
        if (this.#toRender) {
            this.#ui.render(ctx);
            this.#toRender = false;
        }
    }

    update() {

        return this;
    }

};


export default MenuState;
