
/**
 * @param {number} val
 *
 * @returns {boolean}
 */
const isNumber = (val) => typeof val === "number" && Number.isFinite(val);

/**
 * @param {string} str
 *
 * @returns {boolean}
 */
const isString = (str) => str !== null && typeof str !== "undefined" && str.constructor.name === "String";
const isEmptyString = (str) => (isString(str) && str.length === 0);
const isNotEmptyString = (str) => isString(str) && str.length > 0;

/**
 * @param {Function} func
 *
 * @returns {boolean}
 * */
const isFunction = (func) => func instanceof Function;

/**
 * @param {boolean} bool
 *
 * @returns {boolean}
 */
const isBoolean = (bool) => typeof bool === "boolean";

const EventType = {
    animationend: "animationend",
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
const isEventType = (type) => (Object.values(EventType).includes(type));

/** Checks, if a top level property (key) exists in an object
 *
 * @param {Object} obj
 * @param {string} prop
 *
 * @returns {boolean}
 */
const hasProperty = (obj, prop) => ((obj instanceof Object && isString(prop)) ? Object.prototype.hasOwnProperty.call(obj, prop) : false);

/** Checks, if a value exists in a flat object
 *
 * @param {Object} obj
 * @param {any} val
 *
 * @returns {boolean}
 */
const hasValue = (obj, val) => ((obj instanceof Object) ? Object.values(obj).includes(val) : false);


export {
    EventType,
    hasProperty,
    hasValue,
    isBoolean,
    isEventType,
    isFunction,
    isNumber,
    // strings
    isString,
    isEmptyString,
    isNotEmptyString
};
