
const Flag = class {

    /** @type {string} */
    #id;

    /** @type {string} */
    #type;

    /** @type {boolean | number | string} */
    #value;

    /** @type {Array<string>} */
    static allowedTypes = ["boolean", "number", "string"];

    constructor(id, type, value) {

        this.#id = id;

        if (Flag.allowedTypes.includes(type)) {
            this.#type = type;

            if (value === undefined) {
                if (this.#type === "boolean") {
                    this.setValue(false);
                } else if (this.#type === "number") {
                    this.setValue(0);
                } else if (this.#type === "string") {
                    this.setValue("");
                }
            } else {
                this.setValue(value);
            }

        }

    }

    getId() {
        return this.#id;
    }

    getValue() {
        return this.#value;
    }

    setValue(value) {
        // eslint-disable-next-line valid-typeof
        if (typeof value === this.#type) {
            this.#value = value;
        }
        return this;
    }

};


export default Flag;
