
import { loadJSON } from "../../lib/JST/resource/loaders.js";
import * as Tick from "../../lib/JST/native/tick.js";
import Application from "../../lib/JST/dom/Application.js";
import * as Lang from "../../lib/JST/resource/lang.js";

import GameStates from "../states/GameStates.js";
import SetupState from "../states/SetupState.js";


let ctx = null;

const TIME_FRAME = 200;
let time_elapsed = 0;

const game_loop = (dt) => {

    time_elapsed = time_elapsed + dt;

    if (time_elapsed > TIME_FRAME) {

        GameStates.update(dt);
        GameStates.render(ctx);

        if (GameStates.isEmpty()) {
            Tick.stop();
            throw new Error("The game states stack is empty.");
        }

        time_elapsed = 0;
    }

};

const create_application = () => {

    Application.setTitle(Lang.getWord("GameTitle"));
    Application.setContextMenuEnabled(false);

    const app = new Application();
    app.addClass("Center");
    ctx = app.getRootPane();

    // push initial state(s) to gameStates
    GameStates.push(new SetupState());

    Tick.start(game_loop);
};

// load settings .then
loadJSON("dat/locale/base_en.json")
    .then((data) => {

        Lang.setCurrentLanguage(Lang.Language.en);
        Lang.addLanguagePack(data);

        create_application();
    });
