
import { loadJSON } from "../../lib/JST/resource/loaders.js";
import Application from "../../lib/JST/dom/Application.js";
import * as Lang from "../../lib/JST/resource/lang.js";

import GameStatesManager from "../states/GameStatesManager.js";
import StateFactory from "../states/StateFactory.js";


const create_application = () => {

    Application.setTitle(Lang.getWord("GameTitle"));
    Application.setContextMenuEnabled(false);

    const app = new Application()
        .addClass("Center");

    GameStatesManager
        .setTimeFrame(200)
        .setGraphicsContext(app.getRootPane())

        // register all states used
        .register("setupIntro", StateFactory.createSetupIntroState)
        .register("mainMenu", StateFactory.createMenuState)
        .register("loadGame", StateFactory.createLoadGameState)
        .register("textPage", StateFactory.createTextPageState)
        .register("runGame", StateFactory.createInGameState)
        .register("transition", StateFactory.createTransitionState)
        .register("dialog", StateFactory.createDialogState)

        // call first state
        .notify("setupIntro")
        .start();

};

// load settings .then
loadJSON("dat/locale/base_en.json")
    .then((data) => {

        Lang.setCurrentLanguage(Lang.Language.en);
        Lang.addLanguagePack(data);

        create_application();
    });
