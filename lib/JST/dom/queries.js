
import Component from "./Component.js";


/** query selector one element
 *
 * @param  {string} query
 * @param  {Component} parent if not set, than document's root node is used
 *
 * @returns {Component}
 */
const $ = (query, parent = null) => {
    const root = (parent instanceof Component) ? parent.getHTMLElement() : document;
    console.log(root.querySelector(query));
    return (root instanceof HTMLElement) ? root.querySelector(query).wrapper : null;
};

/** query selector multiple elements
 *
 * @param  {string} query
 * @param  {Component} parent if not set, than document's root node is used
 *
 * @returns {Array<Component>}
 */
const $$ = (query, parent = null) => {
    const root = (parent instanceof Component) ? parent.getHTMLElement() : document;
    if (root instanceof HTMLElement) {
        const result = root.querySelectorAll(query);
        return Array.from(result).map((element) => element?.wrapper || null);
    }
    return null;
};


export {
    $,
    $$
};
