
import { isNotEmptyString, isNumber } from "../../lib/JST/native/typeCheck.js";

import GameCache from "../am/GameCache.js";
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
            result = { id: targetID };
            if (stateID === 0) {
                result.remove = true;
            }
        }

    } else if (methodName === "SHOW" || methodName === "HIDE") {
        target.setVisibility(methodName === "SHOW");
        result = { id: targetID };

    } else if (methodName === "INFO") {
        target.setInformation(value);
        result = { id: targetID };

    } else if (methodName === "USE") {
        result = Combination.check(target);

    } else if (methodName === "TAKE" && GameCache.hasItem(value)) {
        activeHero.getInventory().add(value);
        result = { id: value };

    } else if (methodName === "INCLEFT") {
        target.getLeftAction();

    } else if (methodName === "INCRIGHT") {
        target.getRightAction();
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

const evaluateStatement = (statement) => {
    const parts = statement.split(":");
    return (parts.length === 1) ? [null, parts.pop()] : parts;
};

const processStatement = (statement) => {
    const [condition, action] = evaluateStatement(statement);
    if (condition && !evaluate(condition)) {
        return {};
    }
    return parseAction(action);
};

const processClick = ({ hero, element = null, left, right }) => {

    const updates = {};

    if (element) {

        updates.elements = [];

        activeHero = hero;
        clickedObject = element;

        let action = null;

        if (Combination.isActive()) {
            action = Combination.check(element);
            updates.elements = Combination.cancel();
        } else if (left) {
            action = element.getLeftAction();
        } else if (right) {
            action = element.getRightAction();
        }

        const { text, stmt } = action;

        if (isNotEmptyString(text)) {
            updates.text = text;
        }

        if (stmt instanceof Array) {
            stmt.forEach((statement) => updates.elements.push(processStatement(statement)));
        }

    } else if (Combination.isActive()) {
        updates.elements = Combination.cancel();
    }

    return updates;
};


export default processClick;
