
import { isBoolean, isNumber, isString } from "../../lib/JST/native/typeCheck.js";


const Flag = class {

    /** @type {string} */
    #id;

    /** @type {string} */
    #type;

    /** @type {boolean | number | string} */
    #value;

    /** Converts the value passed as parameter according to the data type of the flag object
     *
     * @param {string} value
     *
     * @returns {boolean | number | string}
     */
    #convert = (value) => {

        if (isBoolean(this.#type)) {
            return value === "true";
        }

        if (isNumber(this.#type)) {
            return Number.parseInt(value, 10);
        }

        if (isString(this.#type)) {
            return value;
        }

        return null;
    };

    constructor(id, type, value) {

        this.#id = id;

        if (type === "boolean") {
            this.#type = true;
        } else if (type === "number") {
            this.#type = 1;
        } else if (type === "string") {
            this.#type = "";
        } else {
            this.#type = true;
        }

        this.setValue(value);
    }

    /**
     * @param {string} value
     *
     * @returns {boolean}
     */
    compareTo(value) {
        return this.#value === this.#convert(value);
    }

    getId() {
        return this.#id;
    }

    /** @returns {boolean | number | string} */
    getValue() {
        return this.#value;
    }

    /**  @param {string} value */
    setValue(value) {
        const convertedValue = this.#convert(value);
        if (typeof convertedValue === typeof this.#type) {
            this.#value = convertedValue;
        }
    }

    // TODO add counter/append/addition method
};


export default Flag;
