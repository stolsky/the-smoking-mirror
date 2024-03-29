import { isFunction, isNotEmptyString, isNumber } from "../../lib/JST/native/typeCheck.js";
import * as Tick from "../../lib/JST/native/tick.js";
import StateStack from "../../lib/JST/resource/StateStack.js";
import Cache from "../../lib/JST/resource/Cache.js";


const register = new Cache();

/** @type {StateStack} */
const states = new StateStack();

let graphicsContext = null;

let timeFrame = 100;
let timeElapsed = 0;

const gameLoop = (dt) => {

    timeElapsed = timeElapsed + dt;

    if (timeElapsed > timeFrame) {

        states.update(dt);
        states.render(graphicsContext);

        timeElapsed = 0;
    }

};

const GameStatesManager = {};

GameStatesManager.notify = (id, properties = {}) => {
    if (id === "done") {
        states.pop();
    } else if (register.hasItem(id)) {
        register.getItem(id)(properties);
    }
    return GameStatesManager;
};

GameStatesManager.register = (id, method) => {
    if (isNotEmptyString(id) && isFunction(method)) {
        register.setItem(id, (properties) => states.push(method(properties)));
    }
    return GameStatesManager;
};

GameStatesManager.setGraphicsContext = (ctx = null) => {
    if (ctx) {
        graphicsContext = ctx;
    }
    return GameStatesManager;
};

GameStatesManager.setTimeFrame = (value = 0) => {
    if (isNumber(value)) {
        timeFrame = value;
    }
    return GameStatesManager;
};

GameStatesManager.start = () => {
    Tick.start(gameLoop);
};


export default GameStatesManager;
