

const Combination = class {

    /** @type {Element | Hero | Item} */
    #lock;

    /** @type {Element | Hero | Item} */
    #key;

    #success;

    #init() {
        this.#lock = null;
        this.#key = null;
        this.#success = false;
    }

    constructor() {
        this.#init();
    }

    add(element) {
        const combos = element.getCombinations();
        if (this.#lock === null && combos instanceof Array && combos.length > 0) {
            this.#lock = element;
        } else if (this.#key === null) {
            this.#key = element;
        }
        return { id: element.getId(), highlight: true };
    }

    cancel() {
        const deselect = [];
        if (this.#lock) {
            deselect.push(this.#lock);
        }
        if (this.#key) {
            deselect.push(this.#key);
        }

        this.#init();

        return deselect.map((element) => ({ id: element.getId(), highlight: false }));
    }

    /** @returns {{text?: string, stmt?: Array<string>}} */
    check() {

        let result = {};

        if (this.#lock && this.#key) {

            const combinations = this.#lock.getCombinations();
            for (let i = 0; i < combinations.length; i = i + 1) {
                const { id, text, stmt } = combinations[`${i}`];
                if (this.#key.getId() === id) {
                    this.#success = true;
                    result = { text, stmt };
                    break;
                }
            }

            if (!result.text || !result.stmt) {
                // TODO randomly choose wrong combination text
                result = { text: "TODO WRONG COMBINATION" };
            }

        }

        return result;
    }

    isActive() {
        return (this.#lock || this.#key) !== null;
    }

    wasSuccessful() {
        return this.#success;
    }

};


export default new Combination();
