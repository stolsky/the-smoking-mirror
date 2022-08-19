
import { isBoolean, isNumber, isString } from "../../lib/JST/native/typeCheck.js";


// TODO refactor to a BooleanFlag class, StringFlag and NumberFlag, respectively
// use a Factory method to create all classes from Flag class
// the tests might not fail

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
    #convert = (value = false) => {

        if (isBoolean(this.#type)) {
            return value === "true";
        }

        if (isNumber(this.#type)) {
            const number = Number.parseInt(value, 10);
            if (Number.isFinite(number)) {
                return number;
            }
        }

        if (isString(this.#type)) {
            return value;
        }

        return undefined;
    };

    /** Creates a flag instance with `boolean` as default type if not specified.
     * All method parameters are expected to be strings containing the values with the corresponding data type specified at instantiation.
     *
     * @param {{ id: string, type: string, value?: string | number | boolean }}
     */
    constructor({ id, type, value } = {}) {

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

        this.#value = null;

        this.setValue(value);
    }

    /**
     * @param {string} value
     *
     * @returns {boolean}
     */
    compareTo(value) {
        return this.#value === this.#convert(`${value}`);
    }

    getId() {
        return this.#id;
    }

    /** @returns {boolean | number | string} */
    getValue() {
        return this.#value;
    }

    /** Before testing, every prameter is treated as string
     *
     * @param {string} value
     */
    setValue(value) {
        const convertedValue = this.#convert(`${value}`);
        if (typeof convertedValue === typeof this.#type) {
            this.#value = convertedValue;
        }
    }

    // TODO add counter/append/addition method
};


export default Flag;
