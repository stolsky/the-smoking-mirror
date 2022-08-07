
import { isNotEmptyString, isNumber } from "../../lib/JST/native/typeCheck.js";

import GameCache from "../am/GameCache.js";
import Flag from "../am/Flag.js";


const Combination = (() => {

    /** @type {boolean} */
    let isInProgress = false;

    let lock = null;
    let keys = [];

    const clear = () => {
        isInProgress = false;
        lock = null;
        keys = [];
    };

    const core = {};

    core.add = (element) => {

        const combos = element.getCombinations();
        if (combos instanceof Array) {
            lock = element;
        } else {
            keys.push(element);
        }

        isInProgress = true;
        return { id: element.getId(), highlight: true };
    };

    core.cancel = () => {
        if (lock) {
            keys.push(lock);
        }
        const deselectElements = keys.map((element) => ({ id: element.getId(), highlight: false }));
        clear();
        return deselectElements;
    };

    core.check = () => {

        if (lock && keys.length > 0) {
            let isCombination = true;

            const { id, text, stmt } = lock.getCombinations();
            const allIDs = id.split(",");

            for (let i = 0; i < keys.length; i = i + 1) {
                const currentID = keys[`${i}`].getId();
                if (!allIDs.includes(currentID)) {
                    isCombination = false;
                    break;
                }
            }

            if (isCombination) {
                if (allIDs.length > keys.length) {
                    return {};
                }
                isInProgress = false;
                return { text, stmt };
            }

            isInProgress = false;
            return { text: "Wrong Combination" };
        }

        return {};
    };

    core.isInProgress = () => isInProgress;

    return Object.freeze(core);
})();

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

    //console.log(target, methodName, value);

    let result = null;

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
        result = Combination.add(target);

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

const processClick = (hero, element = null, action = {}) => {

    const updates = {};

    if (element && action) {

        activeHero = hero;
        clickedObject = element;
        let temp = action;

        updates.elements = [];

        if (Combination.isInProgress()) {
            updates.elements.push(Combination.add(element));
            temp = Combination.check();
            if (!Combination.isInProgress()) {
                updates.elements.splice(updates.elements.length, 0, Combination.cancel());
            }
        }

        const { text, stmt } = temp;

        if (isNotEmptyString(text)) {
            updates.text = text;
        }

        if (stmt instanceof Array) {
            stmt.forEach((statement) => {
                // TODO optimize: no null return
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
