
import { isString } from "../native/type_check.js";


/**
 * @param {Function} loader
 * @param  {Array<string>} url
 * @returns {Promise<any[]> | Promise<any>}
 */
const AbstractLoader = (loader, url) => {

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
const loadJSON = async (url = null) => {

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
/** @param  {...string} url */
const JSONLoader = (...url) => AbstractLoader(loadJSON, url);

/** load image asynchronously
 *
 * @param {String} path
 *
 * @returns {Promise}
 */
const loadImage = (path) => {

    if (!isString(path)) {
        return null;
    }

    const img = new Image();
    img.src = path;
    return img.decode();
};
/** @param  {...string} url */
const ImageLoader = (...url) => AbstractLoader(loadImage, url);


export {
    ImageLoader,
    JSONLoader
};
