import {isBoolean, isNumber, isString} from "./utilities.js";

const Flag = (function () {

    let store = {};

    const core = {};

    core.add = function (key, val) {
        if (isString(key) && !store.hasOwnProperty(key)) {
            store[key] = val;
        }
    };

    // remove flag by id
    core.rem = function (key) {
        if (isString(key) && store.hasOwnProperty(key)) {
            delete store[key];
        }
    };

    core.set = function (key, val) {
        if (isString(key) && store.hasOwnProperty(key)) {
            store[key] = val;
        }
    };

    // check if flag has specific value
    core.has = function (key, val) {
        if (isString(key) && store.hasOwnProperty(key)) {
            return store[key] === val;
        } else {
            return null;
        }
    };

    core.clear = function () {
        store = {};
    };

    return Object.freeze(core);
})();

const createBaseObject = function () {};

const Item = (function () {

    let store = {};

    const core = {};

    const create = function () {};

    core.add = function () {};

    core.rem = function (id) {};

    core.get = function (id) {};

    core.clear = function () {
        store = {};
    };

    return Object.freeze(core);
})();

const createSceneElement = function () {};

const Elem = (function () {

    let store = {};

    const core = {};

    const create = function () {};

    core.add = function () {};

    core.rem = function (id) {};

    // get element by id or without all
    core.get = function (id) {};

    core.clear = function () {
        store = {};
    };

    return Object.freeze(core);
})();

const Scene = (function () {

    let store = {};
    let current = null;

    const core = {};

    const create = function () {};

    core.add = function () {};

    // get a hero by id or without the current
    core.get = function (id) {};

    core.clear = function () {
        store = {};
        current = null;
    };

    return Object.freeze(core);
})();

const getObjectById = function (id) {};

const createInventory = function () {};

const Hero = (function () {

    let store = {};
    let current = null;

    const core = {};

    const create = function () {};

    core.add = function () {};

    core.rem = function (id) {};

    // get a hero by id or without the current
    core.get = function (id) {};

    core.clear = function () {
        store = {};
        current = null;
    };

    return Object.freeze(core);
})();
