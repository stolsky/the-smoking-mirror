
import { isNotEmptyString, isNumber } from "../../lib/JST/native/typeCheck.js";

import GameCache, { getActiveHero } from "../am/GameCache.js";
import Flag from "../am/Flag.js";

import Combination from "./combination.js";

/** @type {Element | Item} */
let clickedObject = null;

/** @type {Hero} */
let activeHero = null;

const evaluate = (condition) => {
    if (isNotEmptyString(condition)) {
        const [id, value] = condition.split(" ");
        const flag = GameCache.getItem(id);
        return (flag instanceof Flag) ? flag.compareTo(value) : true;
    }
    return false;
};

/**
 * @param {Element | Item} target
 * @param {string} methodName
 * @param {string} value
 *
 * @returns {{}}
 */
const applyMethod = (target, methodName, value = null) => {

    let result = {};

    const targetID = target.getId();
    const stateID = Number.parseInt(methodName, 10);

    if (isNumber(stateID)) {
        target.updateState(stateID);
        if (targetID !== activeHero.getId()) {
            result = { element: targetID };
            if (stateID === 0) {
                result.remove = true;
            }
        }

    } else if (methodName === "SHOW" || methodName === "HIDE") {
        target.setVisibility(methodName === "SHOW");
        result = { element: targetID };

    } else if (methodName === "INFO") {
        target.setInformation(value);
        result = { element: targetID };

    } else if (methodName === "USE") {
        result = Combination.check(target);

    } else if (methodName === "TAKE" && GameCache.hasItem(value)) {
        activeHero.getInventory().add(value);
        result = { element: value };

    } else if (methodName === "INCLEFT") {
        target.getAction("left");

    } else if (methodName === "INCRIGHT") {
        target.getAction("right");
    }

    return result;
};

const parseTarget = (id) => {

    if (id === "SELF") {
        return clickedObject;
    }

    if (id === "HERO") {
        return activeHero;
    }

    return GameCache.getItem(id);
};

const parseAction = (action) => {

    if (isNotEmptyString(action)) {

        const [id, value1, value2] = action.split(" ");

        if (id === "ENTER") {
            return { enter: value1 };
        }

        if (id === "LOST") {
            return { lost: value1 };
        }

        if (id === "DIALOG") {
            return { dialog: value1 };
        }

        const target = parseTarget(id);
        if (target instanceof Flag) {
            // TODO improve options like adding, substracting here
            target.setValue(value1);

        } else {
            return applyMethod(target, value1, value2);
        }

    }

    return {};
};

const evaluateCommand = (command) => {
    const parts = command.split(":");
    return (parts.length === 1) ? [null, parts.pop()] : parts;
};

const processCommand = (command) => {
    const [condition, action] = evaluateCommand(command);
    if (condition && !evaluate(condition)) {
        return {};
    }
    return parseAction(action);
};

const processCommands = (commands) => {
    const updates = [];
    if (commands instanceof Array) {
        commands.forEach((statement) => updates.push(processCommand(statement)));
    }
    return updates;
};

/** @param {{hero: string, element: string, buttons { left: boolean, middle: boolean, right: boolean} }} */
const processClick = ({ element, buttons }) => {

    // console.log(hero, element, buttons);
    // console.log("click", element, buttons);

    const updates = {};

    const loadedElement = GameCache.getItem(element);
    if (loadedElement) {

        updates.elements = [];

        activeHero = getActiveHero();
        clickedObject = loadedElement;

        let action = null;

        if (Combination.isActive()) {
            action = Combination.check(loadedElement);
            updates.elements = Combination.cancel();
        } else if (buttons) {
            action = loadedElement.getAction(buttons);
        }

        const { text, cmd } = action;

        // console.log("action", text, cmd);

        if (isNotEmptyString(text)) {
            updates.text = text;
        }

        updates.elements = [...updates.elements, ...processCommands(cmd)];

    } else if (Combination.isActive()) {
        updates.elements = Combination.cancel();
    }

    // console.log("updates", updates);

    return updates;
};


export default processClick;
export { processCommands };
