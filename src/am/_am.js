// am = act manager

import {connect, getData, getItem, setData, setItem} from "./cache.js";
import {Element, Hero, Item, Scene} from "./am_classes.js";
import {hasProperty, isFunction, isString} from "../../lib/js_tools.js";


const GAME_DATA_ID = "SmokingMirror";

export const TYPE = Object.freeze({

    HERO: "HERO",
    ELEM: "ELEM",
    ITEM: "ITEM",

    CHANGE: "CHANGE",
    COMBINE: "COMBINE",

    ENTER: "ENTER",
    DIALOG: "DIALOG",
    LOST: "LOST"

});

let actName = null;

const isElement = (id) => (isString(id) && id[0] === "e");
const isItem = (id) => (isString(id) && id[0] === "i");
const isHero = (id) => (isString(id) && id[0] === "h");


export const AllElements = (function () {

    let elements = {};

    const core = {};

    core.hasElement = (id) => isString(id) && hasProperty(elements, id);


    core.addElement = function (id = "elem", name, states, initState) {
        if (isString(id)) {
            if (!core.hasElement(id) && id[0] === "e") {
                elements[id] = new Element(this.id, id, name, states, initState);
            }
        }
    };

    /** Adds all elements from list to the object's storage.
     * Returns an array with the id's of the elements, which were added.
     *
     * @param {Array<Object>} list
     *
     * @return {Array<string>}
     */
    core.addAll = function (list) {
        const added = [];
        if (list instanceof Array) {
            list.forEach(elem => {
                if (hasProperty(elem, "id") && hasProperty(elem, "name") && hasProperty(elem, "states")) {
                    if (isString(elem.id) && !added.includes(elem.id)) {
                        added.push(elem.id);
                    }
                    this.addElement(elem.id, elem.name, elem.states, elem.init);
                }
            });
        }
        return added;
    };

    core.getElementById = (id) => (core.hasElement(id)) ? elements[id] : null;

    core.getAll = () => elements;

    core.clear = function () {
        elements = {};
    };

    return Object.freeze(core);
})();

export const AllItems = (function () {

    let items = {};

    const core = {};

    core.hasItem = (id) => isString(id) && hasProperty(items, id);

    core.addItem = function (id, name, states) {
        // check if id of item starts with "i" and is not already in items list
        if (!core.hasItem(id) && id[0] === "i") {
            items[id] = new Item(id, name, states);
        }
    };

    core.addAll = function (list) {
        if (list instanceof Array) {
            list.forEach(item => {
                if (hasProperty(item, "id") && hasProperty(item, "name") && hasProperty(item, "states")) {
                    core.addItem(item.id, item.name, item.states);
                }
            });
        }
    };

    core.getItemById = (id) => (core.hasItem(id)) ? items[id] : null;

    core.getAll = () => items;

    core.clear = function () {
        items = {};
    };

    return Object.freeze(core);
})();

export const Heroes = (function () {

    const heroes = {};
    /** @type {Hero} */
    let current = null;

    const core = {};

    const hasHero = (id) => isString(id) && hasProperty(heroes, id);

    core.add = function (hero) {
        if (hasProperty(hero, "id") && !hasHero(hero.id)) {
            // TODO: load hero.items from ActItems: {Array<string>} -> {Array<Item>}
            const newHero = new Hero(hero.id, hero.name, hero.states, hero.items);
            newHero.type = TYPE.HERO;
            heroes[hero.id] = newHero;
        }
    };

    /** @param {Array} list */
    core.addAll = function (list) {
        if (list instanceof Array) {
            list.forEach(hero => core.add(hero));
        }
    };

    core.get = (id) => (hasHero(id)) ? heroes[id] : null;

    core.setCurrent = function (id) {
        if (hasHero(id)) {
            current = heroes[id];
        }
    };

    core.getCurrent = () => current;

    return Object.freeze(core);
})();

export const AllScenes = (function () {

    let scenes = {};
    /** @type {Scene} */
    let currentScene = null;

    /**
     * @param {string} id
     *
     * @returns {Scene}
     */
    const hasScene = (id) => isString(id) && hasProperty(scenes, id);

    const core = {};

    /**
     * @param {string} id
     * @param {string} name
     * @param {Array<string>} elements
     */
    core.addScene = function (id, name, elements) {
        if (!hasScene(id)) {
            scenes[id] = new Scene(id, name, elements);
        }
    };

    core.setCurrentScene = function (id) {
        if (hasScene(id)) {
            currentScene = scenes[id];
        }
    };

    /** Get Scene by Id or without Id the current scene
     *
     * @param {string} id
     *
     * @returns {Scene}
     */
    core.getScene = (id = null) => (hasScene(id)) ? scenes[id] : currentScene;

    /**
     * @param {string} id
     *
     * @returns {Array<string>}
     */
    core.getSceneElements = (id) => core.getScene(id).getAllElements();

    core.clear = function () {
        scenes = {};
        currentScene = null;
    };

    return Object.freeze(core);
})();

const setupScenes = function (scenes) {
    if (scenes instanceof Array) {
        scenes.forEach(scene => {
            if (hasProperty(scene, "id") && hasProperty(scene, "name") && hasProperty(scene, "elems")) {
                AllScenes.addScene(scene.id, scene.name, AllElements.addAll(scene.elems));
            }
        });
    }
};

const reset = function () {

    actName = null;

    setData(GAME_DATA_ID);

    AllElements.clear();
    AllScenes.clear();
    AllItems.clear();

};

/**
 * @param {Object} data
 * @param {string} prop
 * @param {Function} create
 */
const createFromData = function (data, prop, create) {
    if (hasProperty(data, prop) && data[prop] instanceof Array) {
        data[prop].forEach(obj => {
            if (isFunction(create)) {
                const newObj = create(obj);
                if (newObj && newObj.getId instanceof Function) {
                    setItem(newObj.getId(), newObj);
                }
            }
        });
    }
};

export const create = function (data) {

    reset();

    actName = data.name;

    connect(GAME_DATA_ID);

    

    createFromData(data, "heroes", createHero)

    createFromData(
        data, "heroes",
        item => {

            const newItem = createHero(item);
            const id = newItem.getId();
            setItem(id, newItem);
            Heroes.add(id); <- necessary?

        }
    );

    createFromData(
        data, "items",
        item => {

            const newItem = createItem(item); // createItem
            const id = newItem.getId(); // same
            setItem(id, newItem); // same
            AllItems.add(id); // AllItems <- necessary?

        }
    );

    // elements

    // scenes

    if (hasProperty(data, "active")) {
        Heroes.setCurrent(data.active);
    }
    

    /*
    if (hasProperty(data, "heroes") && data.heroes instanceof Array) {

        Heroes.addAll(data.heroes);
    }
    if (hasProperty(data, "active")) {
        Heroes.setCurrent(data.active);
    }

    if (hasProperty(data, "items")) {
        AllItems.addAll(data.items);
    }

    if (hasProperty(data, "scenes")) {
        setupScenes(data.scenes);
    }
    */

};

export const getName = () => actName;


let Combination = null;
let Behaviour = null;

Behaviour = (function () {

    /** @type {BaseObject} */
    let currentObject = null;
    /** @type {Object} {text:string, narrator:string} */
    let response = null;

    let updates = [];
    // TODO check if element already in updates queue

    /**
     * @param {string} id
     *
     * @returns {SceneElement | Item}
     */
    const getObjectById = function (objId) {
        let obj = null;
        if (isElement(objId)) {
            obj = AllElements.getElementById(objId);
        } else if (isItem(objId)) {
            obj = AllItems.getItemById(objId);
        }
        return obj;
    };

    const addToUpdates = function (id, type) {
        if (isItem(id)) {
            updates.push({id, obj: TYPE.ITEM, type});
        } else if (isElement(id)) {
            updates.push({id, obj: TYPE.ELEM, type});
        } else if (isHero(id)) {
            updates.push({id, obj: TYPE.HERO, type});
        }
    };

    /**
     * @param {BaseObject} target
     * @param {number} id
     */
    const parseState = function (target, id) {
        target.updateState(parseInt(id, 10));
        addToUpdates(target.getId(), TYPE.CHANGE);
    };
    /**
     * @param {BaseObject} target
     * @param {boolean} isVisible
     */
    const parseVisibility = function (target, isVisible) {
        target.visible = isVisible;
        addToUpdates(target.getId(), TYPE.CHANGE);
    };
    /**
     * @param {Hero} target
     * @param {string} id
     */
    const parseTake = function (target, id) {
        if (target instanceof Hero && AllItems.hasItem(id)) {
            target.getInventory().addItem(id);
            updates.push({id, obj: TYPE.ITEM, type: TYPE.CHANGE});
        }
    };
    const parseEnter = function (target, objId, sceneId) {
        /*
        // check if there are restrictions on that entrance(Element)
        const exit = getObjectById(objId, sceneId);
        if (exit instanceof Element) {
        }
        */
        updates.push({id: sceneId, type: TYPE.ENTER});
    };
    /**
     * @param {BaseObject} target
     * @param {string} val
     */
    const parseInfo = function (target, text) {
        if (text === "NONE") {
            text = "";
        }
        target.info = text;
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
        updates.push({id, type: TYPE.LOST});
    };

    const parseMethod = function (target, parts) {

        const method = parts[0];

        if (method === "STATE") {
            parseState(target, parts[1]);
        } else if (method === "SHOW" || method === "HIDE") {
            parseVisibility(target, method === "SHOW");
        } else if (method === "TAKE") {
            parseTake(target, parts[1]);
        } else if (method === "ENTER") {
            parseEnter(target, parts[1], parts[2]);
        } else if (method === "INFO") {
            parseInfo(target, parts.splice(1).join(" "));
        } else if (method === "USE") {
            parseCombination(target);
        } else if (method === "DIALOG") {
            parseDialogue(target, parts[1]);
        } else if (method === "LOST") {
            parseLost(target, parts[1]);
        }

    };

    const parseTarget = function (id) {
        let target = null;
        if (id === "SELF") {
            target = currentObject;
        } else if (id === "HERO") {
            target = Heroes.getCurrent();
        } else {
            target = getObjectById(id);
        }
        return target;
    };

    const parseAction = function (action) {
        if (action instanceof Array && action.length > 0) {
            action.forEach(part => {
                if (isString(part)) {
                    const commands = part.split(" ");

                    const target = parseTarget(commands[0]);
                    if (target) {
                        parseMethod(target, commands.splice(1));
                    }

                }
            });
        }
    };

    const performAction = function (action) {
        if (hasProperty(action, "act")) {
            parseAction(action.act);
        }

        if (hasProperty(action, "text")) {
            response = {text: action.text || null, narrator: Heroes.getCurrent().name || null};
        }
    };

    const prepareActions = function (active, passive) {

        const next = active.shift();

        // check if duplicate and remove from other queue
        if (next && hasProperty(next, "dupe") && next.dupe) {
            passive.shift();
        }

        // "push" the last element back to stack
        if (active.length === 0) {
            active.push(next);
        }

        performAction(next);

    };

    const core = {};

    /**
     * @param {SceneElement || Item} object
     * @param {boolean} isRightClick
     */
    core.do = function (object, isRightClick = false) {

        currentObject = object;

        if (isRightClick) {
            prepareActions(object.getRightActions(), object.getLeftActions());
        } else {
            prepareActions(object.getLeftActions(), object.getRightActions());
        }

    };

    core.clear = function () {

        updates = [];
        response = null;

    };

    core.performAction = performAction;

    core.getResponse = () => response;
    core.getUpdates = () => updates;

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
