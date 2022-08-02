
import { loadJSON } from "../lib/JST/resource/loaders.js";
import * as Tick from "../lib/JST/native/tick.js";
import Application from "../lib/JST/dom/application.js";
import * as Lang from "../lib/JST/resource/lang.js";
//import { getDefaultRendererContext } from "../lib/JST/";

import GameStates from "./states/game_states.js";
import SetupState from "./states/setup_state.js";


let ctx = null;

const game_loop = (dt) => {

    console.log(dt);

    GameStates.update(dt);
    GameStates.render(ctx);

    if (GameStates.isEmpty()) {
        Tick.stop();
        throw new Error("The game states stack is empty.");
    }
};

const create_application = () => {

    const GAME_TITLE = Lang.getWord("GameTitle");

    Application.setTitle(GAME_TITLE);
    Application.setContextMenuEnabled(false);

    const app = new Application(GAME_TITLE);
    app.addClass("Center");
    ctx = app.getRootPane(); //getDefaultRendererContext();

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
