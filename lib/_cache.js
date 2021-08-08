
import {hasProperty, isString} from "./js_tools.js";


const cache = {};

let current = null;

/** @param {string} id */
export const connect = function (id) {
    if (isString(id) && hasProperty(cache, id)) {
        current = id;
    }
};

const hasData = (id) => isString(id) && hasProperty(cache, id);

/**
 * @param {string} id
 * @param {Object} obj
 */
export const setData = function (id, obj = {}) {

    if (isString(id) && obj instanceof Object) {
        cache[id] = obj;
    }

};

/** @param {string} id */
export const getData = (id) => (hasData(id)) ? cache[id] : null;

export const deleteData = function (id) {
    if (hasData(id)) {
        delete cache[id];
    }
};

/** only works if connected to a data set
 *
 * @param {string} key
 */
export const hasItem = (key) => current && isString(key) && hasProperty(cache[current], key);

/**
 * @param {string} key
 * @param {string} dataSetId
 */
export const getItem = function (key, dataSetId = null) {

    connect(dataSetId);

    return (hasItem(key)) ? cache[current][key] : null;

};

/**
 * @param {string} key
 * @param {Object} val
 * @param {string} dataSetId
 */
export const setItem = function (key, val, dataSetId = null) {

    connect(dataSetId);

    if (current && isString(key)) {
        cache[current][key] = val;
    }
};

export const deleteItem = function (key, dataSetId = null) {

    connect(dataSetId);

    if (hasItem(key)) {
        delete cache[current][key];
    }
};
