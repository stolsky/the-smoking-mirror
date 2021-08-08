
import {isString, loadJSON} from "./utilities.js";

// default language is english
let LANG = "en";

// text data storage for base (often used) text
let BASE = null;
// combined text data of BASE and "chapter" text data
let DICT = null;

export const loadBaseText = function (callback) {
    if (LANG === "en") {
        loadJSON("dat/lang/base_en.json", (data) => {
            if (data instanceof Object) {
                BASE = data;
                DICT = BASE;
            }
        }).then(callback);
    }
};

export const loadChapterText = function (name, callback) {
    if (isString(name)) {
        if (LANG === "en") {
            loadJSON(`dat/lang/${name}_en.json`, (data) => {
                if (data instanceof Object) {
                    DICT = {...BASE, ...data};
                }
            }).then(callback);
        }
    }
};

export const get = (id) => (DICT instanceof Object && isString(id) && DICT.hasOwnProperty(id)) ? DICT[id] : "";

export const change = function (code, name, callback) {
    // TODO country checks
    LANG = code;
    // TODO solve problem with callback & promise
    loadBaseText(callback);
    loadChapterText(name, callback);
};
