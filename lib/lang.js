
import {hasProperty, isString} from "./js_tools.js";
import {Cache} from "./cache.js";

const BASE = "base";

const cache = new Cache();

export const Language = Object.freeze({
    de: "de",
    en: "en"
});
let current = null;

/**
 * @param {Object} data
 * @param {string} id
 */
export const addLanguagePack = function (data, id = null) {
    if (data instanceof Object) {
        cache.setItem(id || BASE, data);
    }
};

export const removeLanguagePack = function (id = null) {
    cache.deleteItem(id || BASE);
};

export const get = (wordId, id = null) => cache.getItem(id || BASE)[wordId];

export const setCurrentLanguage = (type) => {
    if (isString(type) && hasProperty(Language, type.toLowerCase())) {
        current = type.toLowerCase();
    }
};

export const getCurrentLanguage = () => current;
