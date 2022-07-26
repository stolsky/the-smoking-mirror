import { hasProperty } from "../native/type_check.js";


/** query selector one element
 *
 * @param  {string} query
 * @param  {HTMLElement} startFrom if not set, than document's root node is used
 *
 * @returns {Component | HTMLElement}
 */
const $ = (query, startFrom = null) => {
    const root = (startFrom instanceof HTMLElement) ? startFrom : document;
    const found = root.querySelector(query).wrapper;
    return (hasProperty(found, "wrapper")) ? found.wrapper : found;
};

/** query selector multiple elements
 *
 * @param  {string} query
 * @param  {HTMLElement} startFrom if not set, than document's root node is used
 *
 * @returns {Array<Component | HTMLElement>}
 */
const $$ = (query, startFrom = null) => {
    const root = (startFrom instanceof HTMLElement) ? startFrom : document;
    const result = root.querySelectorAll(query);

    return Array.from(result).map((elem) => ((hasProperty(elem, "wrapper")) ? elem.wrapper : elem));
};


export {
    $,
    $$
};
