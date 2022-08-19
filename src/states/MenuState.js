
import { hasSaveGame } from "../core/resource_loader.js";

import Menu from "../ui/Menu.js";

import createNewGame from "./createNewGame.js";
import GameStatesManager from "./GameStatesManager.js";
import State from "./State.js";


const MenuState = class extends State {

    constructor() {

        super();

        const menu = new Menu()
            .setTitle("GameTitle")
            .setSubTitle("GameSubTitle")
            .setDisclaimer("menuDisclaimer")
            .addButton("menuNewGame", () => {
                GameStatesManager.notify("done");
                createNewGame();
            });

        if (hasSaveGame()) {
            menu.addButton("menuLoadGame", () => {
                GameStatesManager.notify("loadGame");
            });
        }

        this.setUI(menu);

    }

};


export default MenuState;
