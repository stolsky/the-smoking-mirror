
let inProgress = false;

/** @type {Element | Hero | Item} */
let lock = null;
/** @type {Element | Hero | Item} */
let key = null;

let success = false;
let resultingActions = [];
let updateElements = [];

const clear = () => {
    inProgress = false;
    lock = null;
    key = null;
    success = false;
    resultingActions = [];
    updateElements = [];
};

const add = (element) => {
    const combos = element.getCombinations();
    if (lock === null && combos instanceof Array && combos.length > 0) {
        lock = element;
    } else if (key === null) {
        key = element;
    }
    inProgress = true;
    return { id: element.getId(), highlight: true };
};

const cancel = () => {
    const deselect = [];
    if (lock) {
        deselect.push(lock);
    }
    if (key) {
        deselect.push(key);
    }
    clear();
    return deselect.map((element) => ({ id: element.getId(), highlight: false }));
};

// TODO set private arrays and use proivate success variable
const check = () => {

    let result = {};

    if (lock && key) {

        let success = false;

        const combinations = lock.getCombinations();
        for (let i = 0; i < combinations.length; i = i + 1) {
            const { id, text, stmt } = combinations[`${i}`];
            if (key.getId() === id) {
                result = { text, stmt };
                success = true;
                break;
            }
        }

        if (!success) {
            // TODO randomly choose wrong combination text
            result = { text: "TODO WRONG COMBINATION" };
        }

        inProgress = false;
    }

    return result;
};

const isActive = () => inProgress;

const tryOut = (element) => {
    let updates = [];

    const highlightElement = add(element);
    const resultAction = check();

    if (!inProgress) {
        updates = 
    } else {
        updates.push(highlightElement);
    }

    updates = [...resultAction, 
    return updates;
};

export {
    add,
    cancel,
    isActive,
    tryOut
};
