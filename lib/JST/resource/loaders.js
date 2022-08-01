
import { isString } from "../native/type_check.js";


/**
 * @param {Function} loader
 * @param  {Array<string>} url
 * @returns {Promise<any[]> | Promise<any>}
 */
const PromiseWrapper = (loader, url) => {

    let promise = null;

    if (loader instanceof Function) {
        promise = (url.length > 1) ? Promise.all(url.map((path) => loader(path))) : loader(url[0]);
    }

    return promise;
};

/**
 * @param {String} url
 *
 * @returns {Promise}
 */
const loadJSONAsynchron = async (url = null) => {

    if (!isString(url)) {
        return null;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    /** @type {RequestInit} */
    const options = {
        method: "GET",
        headers,
        mode: (url.includes("../")) ? "cors" : "same-origin"
    };

    const request = new Request((!url.endsWith(".json")) ? `${url}.json` : url);
    const response = await fetch(request, options);
    return response.json();
};

/** Allows loading multiple JSON files seperated by commata.
 *
 * @param  {...string} url
 *
 * @returns { Promise }
 */
const loadJSON = (...url) => PromiseWrapper(loadJSONAsynchron, url);

/**
 * @param {String} path
 *
 * @returns {Promise}
 */
const loadImageAsynchron = (path) => {

    if (!isString(path)) {
        return null;
    }

    const img = new Image();
    img.src = path;
    return img.decode();
};

/** Allows loading multiple image files seperated by commata.
 *
 * @param  {...string} url
 *
 * @returns { Promise }
 */
const loadImages = (...url) => PromiseWrapper(loadImageAsynchron, url);


export {
    loadImages,
    loadJSON
};
