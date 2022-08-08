
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

    GameStatesManager.setTimeFrame(200)
        .setGraphicsContext(app.getRootPane())
        .register("setupIntro", () => GameStatesManager.push(StateFactory.createSetupIntroState()))
        .register("gameMenu", () => GameStatesManager.push(StateFactory.createMenuState()))
        .register("loadGame", () => GameStatesManager.push(StateFactory.createLoadGameState()))
        .register("gameIntro", (properties) => GameStatesManager.push(StateFactory.createTextPageState({ className: "Intro", ...properties })))
        .register("runGame", (properties) => GameStatesManager.push(StateFactory.createInGameState(properties)))
        .register("gameOver", (properties) => GameStatesManager.push(StateFactory.createMenuState())
            .push(StateFactory.createTextPageState({ className: "GameOver", ...properties })))
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
