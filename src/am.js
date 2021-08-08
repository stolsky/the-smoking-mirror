// am = act manager

import {Element, Hero, Item, Scene} from "./am_classes.js";
import {hasProperty, isBoolean, isFunction, isNumber, isString} from "../lib/js_tools.js";
import {Cache} from "../lib/cache.js";


export const TYPE = Object.freeze({

    CHANGE: "CHANGE",
    COMBINE: "COMBINE",

    ENTER: "ENTER",
    DIALOG: "DIALOG",
    LOST: "LOST"

});

const cache = new Cache();

let actName = null;


const createItem = function (dataObj) {

    let item = null;

    if (hasProperty(dataObj, "name") && hasProperty(dataObj, "states")) {
        item = new Item(dataObj.id, dataObj.name, dataObj.states);
    }

    return item;
};

const createElement = function (dataObj) {

    let element = null;

    if (hasProperty(dataObj, "name") && hasProperty(dataObj, "states")) {
        element = new Element(dataObj.id, dataObj.name, dataObj.states, dataObj.initState);
    }

    return element;
};

/**
 * @param {Object} data
 * @param {string} prop
 * @param {Function} create
 */
const createFromData = function (data, prop, create) {
    if (hasProperty(data, prop) && data[prop] instanceof Array) {
        data[prop].forEach(obj => {

            if (hasProperty(obj, "id") && !cache.hasItem(obj.id) && isFunction(create)) {

                const newObj = create(obj);

                if (newObj && newObj.getId instanceof Function) {
                    cache.setItem(newObj.getId(), newObj);
                }

            }
        });
    }
};

export const Heroes = (function () {

    /** @type {Array<string>} */
    const heroes = [];
    /** @type {Hero} */
    let current = null;

    const core = {};

    const hasHero = (id) => isString(id) && heroes.includes(id);

    /** @param {string} id */
    const addHero = function (id) {
        if (isString(id) && !hasHero(id)) {
            heroes.push(id);
        }
    };

    core.create = function (dataObj) {
        const hero = new Hero(dataObj.id, dataObj.name, dataObj.states, dataObj.items);
        addHero(hero.getId());
        return hero;
    };

    /** @param {string} id */
    core.setCurrent = function (id) {
        if (hasHero(id)) {
            current = cache.getItem(id);
        }
    };

    core.getCurrent = () => current;

    /** @returns {Array<Object>} */
    core.getCurrentInventory = function () {
        return current.getInventory().getAll().map(itemId => cache.getItem(itemId));
    };

    return Object.freeze(core);
})();

export const Scenes = (function () {

    /** @type {Array<string>} */
    let scenes = [];
    /** @type {Scene} */
    let current = null;

    /**
     * @param {string} id
     *
     * @returns {boolean}
     */
    const hasScene = (id) => isString(id) && scenes.includes(id);

    const core = {};

    /**
     * @param {string} id
     * @param {string} name
     * @param {Array<string>} elements
     */
    const addScene = function (id) {
        if (isString(id) && !hasScene(id)) {
            scenes.push(id);
        }
    };

    core.create = function (dataObj) {

        let scene = null;

        if (hasProperty(dataObj, "name")) {

            const elementIDs = [];
            createFromData(dataObj, "elems", dataElemObj => {
                const gameObj = createElement(dataElemObj);
                elementIDs.push(gameObj.getId());
                return gameObj;
            });

            scene = new Scene(dataObj.id, dataObj.name, elementIDs);
            addScene(scene.getId());
        }

        return scene;
    };

    core.setCurrent = function (id) {
        if (hasScene(id)) {
            current = cache.getItem(id);
        }
    };

    core.getCurrent = () => current;

    core.getCurrentElements = function () {
        return current.getAllElements().map(elemId => cache.getItem(elemId));
    };

    core.clear = function () {
        scenes = [];
        current = null;
    };

    return Object.freeze(core);
})();

const initAct = function () {

    actName = null;

    // TODO problem resets Hero data also
    cache.clear();

    Scenes.clear();

};

export const create = function (data) {

    initAct();

    actName = data.name;

    createFromData(data, "heroes", dataObj => Heroes.create(dataObj));
    createFromData(data, "items", dataObj => createItem(dataObj));
    createFromData(data, "scenes", dataObj => Scenes.create(dataObj));

    if (hasProperty(data, "active")) {
        Heroes.setCurrent(data.active);
    }

};

export const getName = () => actName;


let Combination = null;
let Behaviour = null;

Behaviour = (function () {

    /** @type {BaseObject} */
    let currentObject = null;
    /** @type {Object} {text:string, narrator:string} */
    let response = null;

    let isObject = false;
    let flagId = null;
    let counterId = null;

    let updates = {};

    const addToUpdates = function (id, type) {
        if (!hasProperty(updates, id)) {
            updates[id] = {object: cache.getItem(id), type};
        }
    };

    /*
        const parts = condition.split(" ");
        const id = parts[0];
        const obj = getItem(id);
        const val = parts[1];

        if (obj instanceof Object && hasProperty(obj, "updateState")) {

            obj.updateState(val);

        } else if (isNumber(obj) && isString(val)) {

            if (val === "+") {

                setItem(id, val + 1);

            } else if (val === "-") {

                setItem(id, val - 1);

            }

        } else if (isBoolean(obj) && isBoolean(val)) {

            setItem(id, val);

        }
    */

    const setFlagCounter = function (value) {
        if (flagId) {
            // const digit = parseInt(method, 10);
        } else if (counterId) {
            // parse boolean
        }
    };

    const updateState = function (target, stateId) {
        target.updateState(stateId);
        addToUpdates(target.getId(), TYPE.CHANGE);
    };

    const setVisibility = function (target, visible) {
        target.visible = visible;
        addToUpdates(target.getId(), TYPE.CHANGE);
    };

    /**
     * @param {Hero} target
     * @param {string} id
     */
    const takeItem = function (target, id) {
        if (target instanceof Hero && cache.hasItem(id)) {
            target.getInventory().addItem(id);
            addToUpdates(id, TYPE.CHANGE);
        }
    };

    /**
     * @param {BaseObject} target
     * @param {string} val
     */
    const parseInfo = function (target, text) {
        // clear INFO
        if (text === "NONE") {
            text = ""; // TODO change to CLEAR ??
        }
        target.info = text; // check setter if empty string is allowed
        addToUpdates(target.getId(), TYPE.CHANGE);
    };
    const parseCombination = function (target) {
        Combination.add(target);
        addToUpdates(target.getId(), TYPE.COMBINE);
    };

    const parseDialogue = function (target, id) {
        addToUpdates({id, type: TYPE.DIALOG});
    };

    const parseLost = function (target, id) {

        // add statistics ??

        // id = id of text to be shown
        // how to get text id to update method in index.js ?? -> extend methods
        addToUpdates(target.getId(), TYPE.LOST);
    };

    const parseMethod = function (target, parts) {

        const method = parts[0];
        const id = parts[1];
        const digit = parseInt(method, 10);

        // TODO flags & counters

        if (isNumber(digit)) {
            updateState(target, digit);
        } else if (method === "SHOW" || method === "HIDE") {
            setVisibility(target, method === "SHOW");
        } else if (method === "TAKE") {
            takeItem(target, id);
        } else if (method === "ENTER") {

            // parts[1] = object of destination
            // parts[2] = sceneId of destination

            // check if there are restrictions on that entrance(Element)
            // const exit = getObjectById(objId, sceneId);
            // if (exit instanceof Element) {

            addToUpdates(parts[2], TYPE.ENTER);

        } else if (method === "INFO") {
            parseInfo(target, parts.splice(1).join(" "));
        } else if (method === "USE") {
            parseCombination(target);
        } else if (method === "DIALOG") {
            parseDialogue(target, id);
        } else if (method === "LOST") {
            parseLost(target, id);
        }

    };

    const parseTarget = function (id) {

        let target = null;

        isObject = true;

        if (id === "SELF") {
            target = currentObject;
        } else if (id === "HERO") {
            target = Heroes.getCurrent();
        } else {

            target = cache.getItem(id);

            if (isBoolean(target)) {
                flagId = id;
            } else if (isNumber(target)) {
                counterId = id;
            }

        }

        return target;
    };

    const parseAction = function (action) {
        if (isString(action)) {

            const commands = action.split(" ");

            const target = parseTarget(commands[0]);
            const method = commands.splice(1);

            if (target) {
                if (isObject) {
                    parseMethod(target, method);
                } else {
                    setFlagCounter(method);
                }
            }

        }
    };

    const isFulfilled = function (condition) {

        let result = false;

        if (isString(condition)) {

            const parts = condition.split(" ");
            const id = parts[0];
            const obj = cache.getItem(id);
            let val = parts[1].toLowerCase();

            if (obj instanceof Object && hasProperty(obj, "currentState")) {

                result = obj.currentState.id === parseInt(val, 10);

            } else if (isNumber(obj)) {

                result = obj === parseInt(val, 10);

            } else if (isBoolean(obj)) {

                if (val === "true") {
                    val = true;
                } else if (val === "false") {
                    val = false;
                }

                result = obj === val;

            }

        }

        return result;
    };

    const extractActions = function (statements) {
        if (statements instanceof Array && statements.length > 0) {
            statements.forEach(statement => {

                statement = statement.split(":");
                const action = statement.pop();
                const condition = statement.pop();

                if (condition) {
                    if (isFulfilled(condition)) {

                        parseAction(action);

                    }
                } else {

                    parseAction(action);

                }
            });
        }
    };

    const prepareActions = function (action) {

        if (hasProperty(action, "stmt")) {
            extractActions(action.stmt);
        }

        if (hasProperty(action, "text")) {
            response = {text: action.text || null, narrator: Heroes.getCurrent().name || null};
        }
    };

    const core = {};

    /**
     * @param {SceneElement || Item} object
     * @param {boolean} isRightClick
     */
    core.do = function (object, isRightClick = false) {

        currentObject = object;

        if (isRightClick) {
            prepareActions(object.getRightAction());
        } else {
            prepareActions(object.getLeftAction());
        }

    };

    core.clear = function () {

        isObject = false;
        flagId = null;
        counterId = null;

        updates = {};
        response = null;

    };

    core.performAction = prepareActions;

    core.getResponse = () => response;
    core.getUpdates = () => Object.values(updates);

    return Object.freeze(core);
})();

export const COMBINATION = Object.freeze({
    SUCCESS: 1,
    PENDING: 0,
    FAILURE: -1
});
Combination = (function () {

    /** @type {BaseObject} */
    let key = null;
    /** @type {BaseObject} */
    let lock = null;

    const clear = function () {
        key = null;
        lock = null;
    };

    const check = function () {

        let result = COMBINATION.FAILURE;

        if (key && lock) {
            const combinations = lock.getCombinations();
            for (let i = 0; i < combinations.length; i = i + 1) {
                const current = combinations[i];
                if (current.id === key.getId()) {

                    result = COMBINATION.SUCCESS;
                    clear();

                    Behaviour.performAction(current);

                    break;
                }
            }
        }

        return result;
    };

    /**
     * @param {BaseObject#} object
     *
     * @returns {boolean}
     */
    const isLock = function (object) {
        const links = object.getCombinations();
        return links instanceof Array && links.length > 0;
    };

    /**
     * @param {BaseObject} newKey
     *
     * @returns {boolean}
     */
    const addKey = function (newKey) {
        if (key === null) {
            key = newKey;
            return true;
        } else {
            return false;
        }
    };

    /**
     * @param {BaseObject} newLock
     *
     * @returns {boolean}
     */
    const addLock = function (newLock) {
        if (lock === null) {
            lock = newLock;
            return true;
        } else if (key === null) {
            key = newLock;
            return true;
        } else {
            return false;
        }
    };

    const core = {};

    /**
     * @param {BaseObject} object
     *
     * @returns {boolean}
     */
    core.add = function (object) {

        let result = COMBINATION.FAILURE;

        if (isLock(object) && addLock(object)) {
            result = check();
        } else if (addKey(object)) {
            result = check();
        }

        return result;
    };

    /** @returns {boolean} */
    core.isActive = () => key !== null || lock !== null;

    core.clear = clear;

    return Object.freeze(core);
})();

// serves as Interface
export const Interaction = (function () {

    const core = {};

    core.click = Behaviour.do;
    core.getUpdates = Behaviour.getUpdates;
    core.getResponse = Behaviour.getResponse;
    core.clear = Behaviour.clear;

    core.combine = Combination.add;
    core.hasActiveCombination = Combination.isActive;
    core.clearCombination = Combination.clear;

    return Object.freeze(core);
})();

/* COMBINATION OLD

export const Combine = (function () {

    // in the comb.act queue, next "USE" action(s) must be at the end of the queue, especially if also STATE(s) were set

    // combinations storage of id's of items or elements
    let keys = [];
    let lock = null;
    // active flag
    let active = false;

    const spliceComb = function (comb) {
        let result = false;
        if (comb.hasOwnProperty("iter")) {
            comb.iter = comb.iter - 1;
            if (comb.iter === 0) {
                result = true;
            }
        }
        return result;
    };
    // method check is called by core.add(), so there are at least 1 lock and 1 key present
    const check = function () {

        let result = null;

        // there cant be more keys than combination id's
        // if they not "fit" -> stop comb mode -> only correct keys trigger chaining
        // or if they all "fit" -> also stop comb mode
        // console.log("lock:", lock.getId(), "key:", keys[0].getId());
        // there is max 1 lock
        const combs = lock.getCombinations();
        // test all combinations
        for (let i = 0; i < combs.length; i = i + 1) {
            const combNow = combs[i];
            // new array of strings, at least with 1 string
            const ids = combNow.id.split("+");

            // check all keys with id's of current combination
            let keyFound = false;
            for (let j = 0; j < keys.length; j = j + 1) {
                const keyNow = keys[j];
                // there are no obj with the same id
                // if there are more keys than 1, every key must "fit" or break and stop combination
                if (ids.includes(keyNow.getId())) {
                    keyFound = true;
                } else {
                    // break immediately if 1 key doesnt "fit"
                    keyFound = false;
                    break;
                }
            }
            // if keys were found, break
            if (keyFound) {
                // check if keys complete or still some missing
                if (keys.length === ids.length) {
                    if (spliceComb(combNow)) {
                        combs.splice(i, 1);
                    }
                    result = combNow;
                } else {
                    result = "CHAIN";
                }
                break;
            }
        }

        return result;
    };
    const add = function (obj) {
        let result = false;
        // check if obj is of correct instance
        if (obj instanceof Object && obj.hasOwnProperty("getCombinations") && obj.hasOwnProperty("getId")) {
            // lock is not set and obj has lock property
            if (lock === null && obj.getCombinations() !== null) {
                lock = obj;
                result = true;
            // else treat as keys if keys store empty or lock is set
            } else if (keys.length === 0 || lock) {
                keys.push(obj);
                result = true;
            }
        }
        return result;
    };

    const core = {};

    core.start = function (obj) {
        if (!active && add(obj)) {
            UI.startCombination(obj.getUIComponent());
            // no check needed, there can only be 1 lock or 1 key now
            active = true;
            // console.log("start combination", obj.getId(), obj.getCombinations());
        }
    };
    core.add = function (obj) {
        if (active && add(obj)) {
            UI.addCombination(obj.getUIComponent());
            return check();
        } else {
            // stop combination if not added successfully -> have to start with 1 lock and 1 key
            core.stop();
            return null;
        }
    };
    core.isActive = () => active;
    core.stop = function () {
        if (active) {
            if (lock) {
                UI.removeCombination(lock.getUIComponent());
                lock = null;
            }
            if (keys.length > 0) {
                keys.forEach(key => UI.removeCombination(key.getUIComponent()));
                keys = [];
            }
            active = false;
            UI.stopCombination();
            // console.log("stop combination");
        }
    };

    return Object.freeze(core);
})();
*/
