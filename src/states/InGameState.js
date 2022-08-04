
import EventManager from "../core/EventManager.js";
import getWord from "../core/translate.js";
import Interaction from "../core/Interaction.js";

import InGameUI from "../ui/InGameUI.js";
import Act from "../am/Act.js";


// const createMessage = (id) => id.split("+").reduce((acc, part) => `${acc} ${getWord(part)}`, "");
// /** @param {Object} message */
// const addMessage = (message) => {
//     if (message && hasProperty(message, "text") && isString(message.text)) {

//         const text = createMessage(message.text);

//         let narrator = null;
//         if (hasProperty(message, "narrator")) {
//             narrator = getWord(message.narrator);
//         }

//         Log.add(text, narrator);
//     }
// };

// // move to am ???
// const isElement = (object) => object instanceof Element;
// const isItem = (object) => object instanceof Item;
// const isHero = (object) => object instanceof Hero;


// // TODO refactor ??

// const renderElement = (element) => {
//     if (Scenes.getCurrent().hasElement(element.getId())) {

//         if (element.currentState) {
//             renderObject(Scene, element);
//         } else {
//             Scene.remove(element.getId());
//         }

//     }
// };
// const renderItem = (item) => {

//     if (item.currentState) {
//         renderObject(Inventory, item);
//     } else {
//         Heroes.getCurrent().getInventory().removeItem(item.getId());
//         Inventory.remove(item.getId());
//     }
// };
// const renderHero = (hero) => {
//     if (hero.currentState) {
//         renderObject(Scene, hero);
//     } else {
//         Scene.remove(hero.getId());
//     }
// };
// const changeObject = (object) => {
//     if (isElement(object)) {
//         renderElement(object);
//     } else if (isItem(object)) {
//         renderItem(object);
//     } else if (isHero(object)) {
//         renderHero(object);
//     }
// };
// const highlightObject = (object) => {
//     if (isElement(object)) {
//         Scene.highlight(object.getId());
//     } else if (isItem(object)) {
//         Inventory.highlight(object.getId());
//     } else if (isHero(object)) {
//         Scene.highlight(object.getId());
//     }
// };
// const clearCombination = () => {
//     Interaction.clearCombination();
//     Scene.removeHighlights();
//     Inventory.removeHighlights();
// };
// const renderDeath = (id) => {
//     Overlay.setTitle(createMessage("deathTitle"));
//     Overlay.setText(createMessage(id));
//     // Overlay.setCallback();
//     Overlay.show();
// };

// /** @param {Array<Object>} updates */
// const handleUpdates = (updates) => {

//     // console.log(updates);
//     updates.forEach((update) => {

//         if (update.type === TYPE.CHANGE) {
//             changeObject(update.object);
//         } else if (update.type === TYPE.COMBINE) {
//             highlightObject(update.object);
//         } else if (update.type === TYPE.DIALOG) {
//             //
//         } else if (update.type === TYPE.ENTER) {
//             loadScene(update.object.getId());
//         } else if (update.type === TYPE.LOST) {
//             renderDeath(update.object.getId());
//         }

//     });
// };

const InGameState = class {

    #currentAct;

    #toRender;

    /** @type {InGameUI} */
    #wrapper;

    /** @param {Array<{}>} updates  */
    #processUpdates = (updates) => {

        // clear highlights after combination or canceled combination
        // render death
        // update elements from Scene -> remove, hide, show
        // update elements from Inventory -> add, remove

        // scene: {hide: [id1, id2, ...], remove: [id3, id4, ...], show: [id5, id6, ...]}
        // select?: [id7, id8, ..], deselect?: [..]
        // inventory: {add: [..], remove: [..]}

        if (updates instanceof Array) {
            updates.forEach((update) => {

            });
        }
    };

    #handleInput = (input) => {
        if (input) {

            /** @type {Array<string>} Array with all element IDs that need to be updated. */
            let updates = [];

            const element = (input.id) ? this.#currentAct.getElement(input.id) : null;

            if (input.left) {
                updates = Interaction.leftClick(element);
            } else if (input.right) {
                updates = Interaction.rightClick(element);
            }

            this.#processUpdates(updates);
        }
    };

    /**
     * @param {{name: string, start: string, hero: string, elements: Cache}} properties
     */
    constructor(properties) {

        this.#currentAct = new Act(properties.name, properties.elements)
            .loadScene(properties.start)
            .setActiveHero(properties.hero);

        this.#wrapper = new InGameUI()
            .setSceneTitle(getWord(this.#currentAct.getCurrentScene().getName()))
            // TODO clear scene before adding elements of another scene
            .updateSceneElements(this.#currentAct.getAllElements())
            .updateInventoryElements()
            .updateLog();

        // move between scenes
        // * load elements of new scene
        // * set scene title
        // * reset log if necessary

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        return this;
    }

    render(ctx) {
        if (this.#toRender) {
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {

        this.#handleInput(EventManager.getInputEvent());

    }

};


export default InGameState;
