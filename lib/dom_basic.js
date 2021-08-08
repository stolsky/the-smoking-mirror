
import {isString} from "./js_tools.js";


/** query selector one element
 *
 * @param  {string} query
 * @param  {HTMLElement} startFrom if not set, than document's root node is used
 *
 * @returns {HTMLElement}
 */
export const $ = (query, startFrom = null) => (startFrom instanceof HTMLElement) ? startFrom.querySelector(query) : document.querySelector(query);
/** query selector multiple elements
 *
 * @param  {string} query
 * @param  {HTMLElement} startFrom if not set, than document's root node is used
 *
 * @returns {Array<HTMLElement>}
 */
export const $$ = (query, startFrom = null) => (startFrom instanceof HTMLElement) ? Array.from(startFrom.querySelectorAll(query)) : Array.from(document.querySelectorAll(query));

/**
 * @param {HTMLElement | string} target
 *
 * @returns {HTMLElement}
 */
const getHTMLElement = (target) => {
    if (target instanceof HTMLElement) {
        return target;
    } else if (isString(target)) {
        return $(target, null);
    } else {
        return null;
    }
};
/** get all siblings from a specific node
 *
 * @param {HTMLElement} node
 *
 * @returns {Array<Node>}
 */
export const getSiblings = (node) => {
    let arr = null;
    if (getHTMLElement(node)) {
        if (node.parentNode) {
            // childNodes returns a NodeList which is not an array
            // we have to convert via Array.from(array-like)
            arr = Array.from(node.parentNode.childNodes).filter(sibling => sibling !== node);
        }
    }
    return arr;
};
/** gets a node from the dom tree upon selected node by class name
 *
 *  @param {Element} node
 *  @param {string} selector containing class name
 *
 *  @returns {Element}
 */
export const getParent = (node, selector) => {
    while (node instanceof Node && node.tagName !== "BODY") {
        if (node.className === selector) {
            break;
        }
        node = node.parentElement;
    }
    return node;
};

/**
 * @param {string} id
 *
 * @returns {boolean}
 */
export const isUnique = (id) => (isString(id) && !document.getElementById(id));

/** shortened method to create DOM elements
 *
 * @param  {string} tagName
 * @param  {string} className
 *
 * @returns {HTMLElement}
 */
export const create = (tagName, className = null) => {

    let obj = null;

    if (isString(tagName)) {

        // make sure tagName is in correct writing to match checks
        tagName = tagName.toLowerCase();
        obj = document.createElement(tagName);

        if (isString(className)) {
            obj.className = className;
        }

    }

    return obj;
};

/**
 * @param {HTMLElement} elementToAdd
 * @param {boolean} clearInnerHTML
 */
export const appendToBody = (elementToAdd = null, clearInnerHTML = false) => {
    if (elementToAdd instanceof HTMLElement) {
        if (clearInnerHTML) {
            // clear document
            document.body.innerHTML = "";
        }
        document.body.appendChild(elementToAdd);
    }
};

/**
 * @param {string} title
 */
export const setDocumentTitle = (title = null) => {
    if (isString(title)) {
        document.title = title;
    }
};

export const disableContextMenu = () => {
    // eslint-disable-next-line no-console
    console.warn("contet menu is disabled");
    document.addEventListener("contextmenu", (event) => {
        event.stopPropagation();
        event.preventDefault();
    });
};

export const toggleFullScreen = function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
};
