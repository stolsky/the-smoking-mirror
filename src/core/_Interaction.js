/* eslint-disable */

export const COMBINATION = Object.freeze({
    SUCCESS: 1,
    PENDING: 0,
    FAILURE: -1
});

Combination = (() => {

    /** @type {BaseObject} */
    let key = null;
    /** @type {BaseObject} */
    let lock = null;

    const clear = () => {
        key = null;
        lock = null;
    };

    const check = () => {

        let result = COMBINATION.FAILURE;

        if (key && lock) {
            const combinations = lock.getCombinations();
            for (let i = 0; i < combinations.length; i = i + 1) {
                const current = combinations[i];
                if (current.id === key.getId()) {

                    result = COMBINATION.SUCCESS;
                    clear();

                    Behaviour.performAction(current);

                    break;
                }
            }
        }

        return result;
    };

    /**
     * @param {BaseObject#} object
     *
     * @returns {boolean}
     */
    const isLock = (object) => {
        const links = object.getCombinations();
        return links instanceof Array && links.length > 0;
    };

    /**
     * @param {BaseObject} newKey
     *
     * @returns {boolean}
     */
    const addKey = (newKey) => {
        if (key === null) {
            key = newKey;
            return true;
        }
        return false;
    };

    /**
     * @param {BaseObject} newLock
     *
     * @returns {boolean}
     */
    const addLock = (newLock) => {
        if (lock === null) {
            lock = newLock;
            return true;
        }
        if (key === null) {
            key = newLock;
            return true;
        }
        return false;
    };

    const core = {};

    /**
     * @param {BaseObject} object
     *
     * @returns {boolean}
     */
    core.add = (object) => {

        let result = COMBINATION.FAILURE;

        if (isLock(object) && addLock(object)) {
            result = check();
        } else if (addKey(object)) {
            result = check();
        }

        return result;
    };

    /** @returns {boolean} */
    core.isActive = () => key !== null || lock !== null;

    core.clear = clear;

    return Object.freeze(core);
})();


/* COMBINATION OLD

export const Combine = (function () {

    // in the comb.act queue, next "USE" action(s) must be at the end of the queue, especially if also STATE(s) were set

    // combinations storage of id's of items or elements
    let keys = [];
    let lock = null;
    // active flag
    let active = false;

    const spliceComb = function (comb) {
        let result = false;
        if (comb.hasOwnProperty("iter")) {
            comb.iter = comb.iter - 1;
            if (comb.iter === 0) {
                result = true;
            }
        }
        return result;
    };
    // method check is called by core.add(), so there are at least 1 lock and 1 key present
    const check = function () {

        let result = null;

        // there cant be more keys than combination id's
        // if they not "fit" -> stop comb mode -> only correct keys trigger chaining
        // or if they all "fit" -> also stop comb mode
        // console.log("lock:", lock.getId(), "key:", keys[0].getId());
        // there is max 1 lock
        const combs = lock.getCombinations();
        // test all combinations
        for (let i = 0; i < combs.length; i = i + 1) {
            const combNow = combs[i];
            // new array of strings, at least with 1 string
            const ids = combNow.id.split("+");

            // check all keys with id's of current combination
            let keyFound = false;
            for (let j = 0; j < keys.length; j = j + 1) {
                const keyNow = keys[j];
                // there are no obj with the same id
                // if there are more keys than 1, every key must "fit" or break and stop combination
                if (ids.includes(keyNow.getId())) {
                    keyFound = true;
                } else {
                    // break immediately if 1 key doesnt "fit"
                    keyFound = false;
                    break;
                }
            }
            // if keys were found, break
            if (keyFound) {
                // check if keys complete or still some missing
                if (keys.length === ids.length) {
                    if (spliceComb(combNow)) {
                        combs.splice(i, 1);
                    }
                    result = combNow;
                } else {
                    result = "CHAIN";
                }
                break;
            }
        }

        return result;
    };
    const add = function (obj) {
        let result = false;
        // check if obj is of correct instance
        if (obj instanceof Object && obj.hasOwnProperty("getCombinations") && obj.hasOwnProperty("getId")) {
            // lock is not set and obj has lock property
            if (lock === null && obj.getCombinations() !== null) {
                lock = obj;
                result = true;
            // else treat as keys if keys store empty or lock is set
            } else if (keys.length === 0 || lock) {
                keys.push(obj);
                result = true;
            }
        }
        return result;
    };

    const core = {};

    core.start = function (obj) {
        if (!active && add(obj)) {
            UI.startCombination(obj.getUIComponent());
            // no check needed, there can only be 1 lock or 1 key now
            active = true;
            // console.log("start combination", obj.getId(), obj.getCombinations());
        }
    };
    core.add = function (obj) {
        if (active && add(obj)) {
            UI.addCombination(obj.getUIComponent());
            return check();
        } else {
            // stop combination if not added successfully -> have to start with 1 lock and 1 key
            core.stop();
            return null;
        }
    };
    core.isActive = () => active;
    core.stop = function () {
        if (active) {
            if (lock) {
                UI.removeCombination(lock.getUIComponent());
                lock = null;
            }
            if (keys.length > 0) {
                keys.forEach(key => UI.removeCombination(key.getUIComponent()));
                keys = [];
            }
            active = false;
            UI.stopCombination();
            // console.log("stop combination");
        }
    };

    return Object.freeze(core);
})();
*/
