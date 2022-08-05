
import { isNotEmptyString, isNumber } from "../../lib/JST/native/typeCheck.js";

import GameCache from "../am/GameCache.js";
import Element from "../am/Element.js";
import Flag from "../am/Flag.js";
import Item from "../am/Item.js";


const Combination = (() => {

    /** @type {boolean} */
    let isInProgress = false;

    const elements = [];

    const core = {};

    /**
     * @param {Element | Item} element
     *
     * @returns {Array<{}>}
     */
    core.add = (element) => {
        console.log(element.getCombinations());
    };

    core.cancel = () => {

    };

    core.isInProgress = () => isInProgress;

    return Object.freeze(core);
})();

/** @type {Element | Item} */
let currentObject = null;

const evaluate = (condition) => {
    const [id, value] = condition.split(" ");
    const flag = GameCache.getItem(id);
    return (flag instanceof Flag) ? flag.compareTo(value) : true;
};

/**
 * @param {Element | Item} target
 * @param {string} methodName
 * @param {string} value
 *
 * @returns {{}}
 */
const applyMethod = (target, methodName, value = null) => {

    let result = null;

    const targetId = target.getId();
    const stateId = Number.parseInt(methodName, 10);

    if (isNumber(stateId)) {
        target.setCurrentState(stateId);
        result = { id: targetId };

    } else if (target instanceof Element && (methodName === "SHOW" || methodName === "HIDE")) {
        target.setVisibility(methodName === "SHOW");
        result = { id: targetId };

    } else if (methodName === "INFO") {
        target.setInformation(value);
        result = { id: targetId };

    } else if (methodName === "USE") {
        result = Combination.add(target);

    } else if (methodName === "INCLEFT") {
        target.getLeftAction();

    } else if (methodName === "INCRIGHT") {
        target.getRightAction();
    }

    return result;
};

const parseTarget = (id) => ((id === "SELF") ? currentObject : GameCache.getItem(id));

const parseAction = (action) => {

    if (isNotEmptyString(action)) {

        const [id, value1, value2] = action.split(" ");

        if (id === "TAKE" && GameCache.hasItem(value1)) {
            return { item: value1, remove: currentObject.getId() };
        }

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

    return null;
};

const evaluateStatement = (statement) => {
    const parts = statement.split(":");
    return (parts.length === 1) ? [null, parts.pop()] : parts;
};

const processStatement = (statement) => {
    const [condition, action] = evaluateStatement(statement);
    if (condition && !evaluate(condition)) {
        return null;
    }
    return parseAction(action);
};

const processClick = (element = null, action = null) => {

    const updates = {};

    if (element && action) {

        currentObject = element;

        const { text, stmt } = action;

        if (isNotEmptyString(text)) {
            updates.text = text;
        }

        if (stmt instanceof Array) {
            updates.elements = [];
            stmt.forEach((statement) => {
                const result = processStatement(statement);
                if (result) {
                    updates.elements.push(result);
                }
            });
        }

    } else if (Combination.isInProgress()) {
        updates.elements = Combination.cancel();
    }

    return updates;
};


export default processClick;
