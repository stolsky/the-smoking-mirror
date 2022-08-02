
import InGameUI from "../ui/ingame.js";
import Act from "../am/act.js";
import Scene from "../ui/scene.js";


// import { hasProperty, isString } from "../lib/JST/native/type_check.js";
// import * as Lang from "../lib/JST/resource/lang.js";

// import { COMBINATION, create as createAct, Heroes, Interaction, Scenes, TYPE } from "./am/am.js";

// import Element from "./am/element.js";
// import Hero from "./am/hero.js";
// import Item from "./am/item.js";


// let interact = null;
// let loadScene = null;


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
// const renderObject = (target, object) => {
//     target.render(
//         object.getId(),
//         object.visible || false, // dont exists at Item
//         object.type, // always the same for Inventory -> object.type = "Use"
//         getWord(object.name),
//         getWord(object.info),
//         object.foreground,
//         object.background,
//         (event) => { interact(event, object); }
//     );
// };
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

// const processClick = (mouseButton, targetObject) => {
//     if (mouseButton === 0) {
//         if (Interaction.hasActiveCombination()) {
//             const result = Interaction.combine(targetObject);
//             if (result === COMBINATION.SUCCESS) {
//                 clearCombination();
//             } else if (result === COMBINATION.FAILURE) {
//                 // console.log("COMBINATION FAILURE");
//                 clearCombination();
//             }
//         } else {
//             Interaction.click(targetObject);
//         }
//     } else if (mouseButton === 2) {
//         if (Interaction.hasActiveCombination()) {
//             clearCombination();
//         } else {
//             Interaction.click(targetObject, true);
//         }
//     }
// };

// interact = (event, target) => {
//     event.stopPropagation();

//     Interaction.clear();

//     processClick(event.button, target);

//     addMessage(Interaction.getResponse());

//     const updates = Interaction.getUpdates();
//     // console.log(updates);
//     handleUpdates(updates);

// };

// loadScene = (id) => {

//     Scenes.setCurrent(id);
//     const scene = Scenes.getCurrent();
//     const hero = Heroes.getCurrent();

//     Scene.clear();
//     Scene.setTitle(getWord(scene.getName()));

//     renderObject(Scene, hero);

//     Scenes.getCurrentElements().forEach((elem) => renderElement(elem));
//     Heroes.getCurrentInventory().forEach((item) => renderObject(Inventory, item));

// };

const InGameState = class {

    #act;

    #scene;

    #toRender;

    /** @type {InGameUI} */
    #wrapper;

    constructor(script, start_scene) {

        this.#act = new Act(script);
        // this.#scene = new Scene(start_scene);

        this.#wrapper = new InGameUI();
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
            ctx.addComponent(this.#wrapper.getContainer());
            this.#toRender = false;
        }
    }

    update() {
        // calculate animation
        const input = this.#wrapper.getInputEvent();
        if (input) {
            // if (Interaction.hasActiveCombination()) {
            //     clearCombination();
            // }
        }
    }

};


export default InGameState;
