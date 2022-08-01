
import * as Tick from "../lib/JST/native/tick.js";
import Application from "../lib/JST/dom/application.js";
//import { getDefaultRendererContext } from "../lib/JST/";

import GameStates from "./game_states.js";
import * as SetupState from "./setup_state.js";


const GAME_TITLE = "The Broken Mirror";
const app = new Application(GAME_TITLE);
const ctx = app.getRootPane();

// push initial state(s) to gameStates
GameStates.push(SetupState);

// game loop
Tick.start((dt) => {

    GameStates.update(dt);
    GameStates.render(ctx);

    if (GameStates.isEmpty()) {
        Tick.stop();
        throw new Error("The game states stack is empty.");
    }
});
