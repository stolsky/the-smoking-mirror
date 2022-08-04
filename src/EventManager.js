
const EventManager = class {

    /** @type {Array<{id: string, left?: boolean, middle?: boolean, right?: boolean}>} */
    #events;

    constructor() {
        this.#events = [];
    }

    getInputEvent() {
        return this.#events.pop();
    }

    setInputEvent(event, targetID = null) {
        if (event instanceof Event) {
            const store = {};
            store.id = targetID;
            if (event instanceof MouseEvent) {
                if (event.button === 0) {
                    store.left = true;
                } else if (event.button === 1) {
                    store.middle = true;
                } else if (event.button === 2) {
                    store.right = true;
                }
            }
            this.#events[0] = store;

            event.preventDefault();
            event.stopPropagation();
        }
        return this;
    }

};


export default new EventManager();
