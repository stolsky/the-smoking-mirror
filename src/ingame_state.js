
import { hasProperty, isString } from "../lib/JST/native/type_check.js";
import { JSONLoader } from "../lib/JST/resource/loaders.js";
import * as Lang from "../lib/JST/resource/lang.js";

import { clear as clearUI, initGameUI, Inventory, Log, Menu, Overlay, Scene, setup as setupUI } from "./ui/ui.js";
import { COMBINATION, create as createAct, Heroes, Interaction, Scenes, TYPE } from "./am/am.js";

import Element from "./am/element.js";
import Hero from "./am/hero.js";
import Item from "./am/item.js";


let currentScript = null;

let interact = null;
let loadScene = null;

/**
 * @param {string} id
 *
 * @returns {string}
 */
const getWord = (id) => {
    if (isString(id)) {
        let pack = null;
        if (id.startsWith(currentScript)) {
            pack = currentScript;
        }
        return Lang.getWord(id, pack);
    }
    return null;
};
const createMessage = (id) => id.split("+").reduce((acc, part) => `${acc} ${getWord(part)}`, "");
/** @param {Object} message */
const addMessage = (message) => {
    if (message && hasProperty(message, "text") && isString(message.text)) {

        const text = createMessage(message.text);

        let narrator = null;
        if (hasProperty(message, "narrator")) {
            narrator = getWord(message.narrator);
        }

        Log.add(text, narrator);
    }
};

// move to am ???
const isElement = (object) => object instanceof Element;
const isItem = (object) => object instanceof Item;
const isHero = (object) => object instanceof Hero;


// TODO refactor ??
const renderObject = (target, object) => {
    target.render(
        object.getId(),
        object.visible || false, // dont exists at Item
        object.type, // always the same for Inventory -> object.type = "Use"
        getWord(object.name),
        getWord(object.info),
        object.foreground,
        object.background,
        (event) => { interact(event, object); }
    );
};
const renderElement = (element) => {
    if (Scenes.getCurrent().hasElement(element.getId())) {

        if (element.currentState) {
            renderObject(Scene, element);
        } else {
            Scene.remove(element.getId());
        }

    }
};
const renderItem = (item) => {

    if (item.currentState) {
        renderObject(Inventory, item);
    } else {
        Heroes.getCurrent().getInventory().removeItem(item.getId());
        Inventory.remove(item.getId());
    }
};
const renderHero = (hero) => {
    if (hero.currentState) {
        renderObject(Scene, hero);
    } else {
        Scene.remove(hero.getId());
    }
};
const changeObject = (object) => {
    if (isElement(object)) {
        renderElement(object);
    } else if (isItem(object)) {
        renderItem(object);
    } else if (isHero(object)) {
        renderHero(object);
    }
};
const highlightObject = (object) => {
    if (isElement(object)) {
        Scene.highlight(object.getId());
    } else if (isItem(object)) {
        Inventory.highlight(object.getId());
    } else if (isHero(object)) {
        Scene.highlight(object.getId());
    }
};
const clearCombination = () => {
    Interaction.clearCombination();
    Scene.removeHighlights();
    Inventory.removeHighlights();
};
const renderDeath = (id) => {
    Overlay.setTitle(createMessage("deathTitle"));
    Overlay.setText(createMessage(id));
    // Overlay.setCallback();
    Overlay.show();
};

/** @param {Array<Object>} updates */
const handleUpdates = (updates) => {

    // console.log(updates);
    updates.forEach((update) => {

        if (update.type === TYPE.CHANGE) {
            changeObject(update.object);
        } else if (update.type === TYPE.COMBINE) {
            highlightObject(update.object);
        } else if (update.type === TYPE.DIALOG) {
            //
        } else if (update.type === TYPE.ENTER) {
            loadScene(update.object.getId());
        } else if (update.type === TYPE.LOST) {
            renderDeath(update.object.getId());
        }

    });
};

const processClick = (mouseButton, targetObject) => {
    if (mouseButton === 0) {
        if (Interaction.hasActiveCombination()) {
            const result = Interaction.combine(targetObject);
            if (result === COMBINATION.SUCCESS) {
                clearCombination();
            } else if (result === COMBINATION.FAILURE) {
                // console.log("COMBINATION FAILURE");
                clearCombination();
            }
        } else {
            Interaction.click(targetObject);
        }
    } else if (mouseButton === 2) {
        if (Interaction.hasActiveCombination()) {
            clearCombination();
        } else {
            Interaction.click(targetObject, true);
        }
    }
};

interact = (event, target) => {
    event.stopPropagation();

    Interaction.clear();

    processClick(event.button, target);

    addMessage(Interaction.getResponse());

    const updates = Interaction.getUpdates();
    // console.log(updates);
    handleUpdates(updates);

};

loadScene = (id) => {

    Scenes.setCurrent(id);
    const scene = Scenes.getCurrent();
    const hero = Heroes.getCurrent();

    Scene.clear();
    Scene.setTitle(getWord(scene.getName()));

    renderObject(Scene, hero);

    Scenes.getCurrentElements().forEach((elem) => renderElement(elem));
    Heroes.getCurrentInventory().forEach((item) => renderObject(Inventory, item));

};

const startScript = (scriptName, newGame = false) => {
    if (isString(scriptName)) {

        JSONLoader(
            `dat/scenes/${scriptName}.json`,
            `dat/locale/${scriptName}_${Lang.getCurrentLanguage()}.json`
        ).then((data) => {

            const script = data[0];
            currentScript = script.id;

            Lang.addLanguagePack(data[1], currentScript);

            /*
            This must be the place - Professor Oubier's house.
Looks pretty creepy...!
I'd been away from Paris and hadn't seen Nico for nearly six months.
I wanted to celebrate our reunion, but she had other plans.
An appointment with an archaeologist...
Something to do with a Mayan stone she came across while researching a story.
I didn't argue. We'd done enough of that before we'd split up.
The guy who answered the door didn't look much like an archaeologist to me.
I had a bad feeling about this...
            */
            if (newGame) {
                Overlay.setTitle(getWord("par1Name"));
                Overlay.setText(getWord("par1Prolog"));
                Overlay.setHint(getWord("clickToContinue"));
                // Overlay.setCallback();
                Overlay.show();
            }

            createAct(script);
            loadScene(script.start);
        });

    }
};

const start = (scriptName, newGame = false) => {

    

    // ?? toggleFullScreen();

    initGameUI(
        () => {
            if (Interaction.hasActiveCombination()) {
                clearCombination();
            }
        }
    );

    startScript(scriptName, newGame);
};

start("paris1", false);
