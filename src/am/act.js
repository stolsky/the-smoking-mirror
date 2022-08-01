
import { hasProperty } from "../../lib/js_tools.js";


/**
 * @param {Object} data
 * @param {string} prop
 * @param {Function} create
 */
const createFromData = (data, prop, create) => {
    if (hasProperty(data, prop) && data[prop] instanceof Array) {
        data[prop].forEach((obj) => {

            if (hasProperty(obj, "id") && !cache.hasItem(obj.id) && isFunction(create)) {

                const newObj = create(obj);

                if (newObj && newObj.getId instanceof Function) {
                    cache.setItem(newObj.getId(), newObj);
                }

            }
        });
    }
};

const Act = class {

    #name;

    #elements;
    #heroes;
    #scenes;

    /** @param {{}} act_data */
    #parseActData = (act_data) => {

    };

    /** @param {{}} act_data */
    constructor(act_data) {

        this.#name = act_data.name;

        createFromData(act_data, "heroes", (dataObj) => Heroes.create(dataObj));
        createFromData(act_data, "items", (dataObj) => createItem(dataObj));
        createFromData(act_data, "scenes", (dataObj) => Scenes.create(dataObj));

        if (hasProperty(act_data, "active")) {
            Heroes.setCurrent(act_data.active);
        }

    }

    getName() {
        return this.#name;
    }

};


export default Act;
