
/**
 * @param {number} val
 *
 * @returns {boolean}
 */
export const isNumber = val => typeof val === "number" && isFinite(val);
/**
 * Checks if the parameter is of type "string" and then if it's not empty.
 *
 * @param {string} str
 * @param {boolean} ignoreEmpty
 *
 * @returns {boolean}
 */
export const isString = function (str, ignoreEmpty = false) {
    const result = typeof str === "string";
    return (ignoreEmpty) ? result : result && str.length > 0;
};
/**
 * @param {Function} func
 *
 * @returns {boolean}
 * */
export const isFunction = func => func instanceof Function;
/**
 * @param {boolean} bool
 *
 * @returns {boolean}
 */
export const isBoolean = bool => typeof bool === "boolean";

export const EventType = {
    click: "click",
    change: "change",
    input: "input",
    keyup: "keyup",
    mouseenter: "mouseenter",
    mouseleave: "mouseleave",
    mouseup: "mouseup"
};
/**
 * @param {string} type
 *
 * @returns {boolean}
 */
export const isEventType = type => (Object.values(EventType).includes(type));

/**
 * @param {Object} obj
 * @param {string} prop
 *
 * @returns {boolean}
 */
export const hasProperty = (obj, prop) => (obj instanceof Object && isString(prop)) ? Object.prototype.hasOwnProperty.call(obj, prop) : false;
/** Checks, if a value exists in a flat object
 *
 * @param {Object} obj
 * @param {any} val
 *
 * @returns {boolean}
 */
export const hasValue = (obj, val) => (obj instanceof Object) ? Object.values(obj).includes(val) : false;

/**
 * @param {String} url
 *
 * @returns {Promise}
 */
const loadJSON = (url) => {

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    /** @type {RequestInit} */
    const options = {
        method: "GET",
        headers,
        mode: (url.includes("../")) ? "cors" : "same-origin"
    };

    if (!url.endsWith(".json")) {
        url = url + ".json";
    }

    const request = new Request(url);
    return fetch(request, options).then((response) => response.json());
};
/**
 * @param  {Array<string> | string} url
 * @param {Function} success
 * @param {Function} failure
 */
export const JSONLoader = function (url) {

    let promise = null;

    if (url instanceof Array) {
        promise = Promise.all(url.map(u => loadJSON(u)));
    } else if (isString(url)) {
        promise = loadJSON(url);
    }

    return promise;
};

/** load image asynchronously
 *
 * @param {String} path
 * @param {Function} success
 * @param {Function} error
 */
export const loadImage = (path, success, error = null) => {
    const img = new Image();
    img.onload = function () {
        if (success instanceof Function) {
            success(img);
        }
    };
    img.onerror = function (e) {
        if (error instanceof Function) {
            error(e);
        }
    };
    img.src = path;
};

// TODO ImageLoader like JSONLoader

export const insertStyleSheet = function (path) {
    document.styleSheets[0].insertRule(`@import url(${path})`, 0);
};
