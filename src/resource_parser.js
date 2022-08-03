
import { hasProperty } from "../lib/JST/native/type_check.js";
import Cache from "../lib/JST/resource/cache.js";

import Dialog from "./am/dialog.js";
import Element from "./am/element.js";
import Flag from "./am/flag.js";
import Hero from "./am/hero.js";
import Item from "./am/item.js";
import Scene from "./am/scene.js";


/** @returns {Cache} */
const parseResource = (source, method) => {

    const cache = new Cache();

    if (source instanceof Array) {
        source.forEach((element) => {
            const result = method(element);
            if (result instanceof Object && hasProperty(result, "key") && hasProperty(result, "value")) {
                const { key, value } = result;
                cache.setItem(key, value);
            }
        });
    }

    return cache;
};

const parseDialogs = (source) => parseResource(source, (dialog) => ({ key: dialog.id, value: new Dialog(dialog.id, dialog.states) }));

const parseFlags = (source) => parseResource(source, (flag) => {
    const [id, type, value] = flag.split(":");
    return { key: id, value: new Flag(id, type, value) };
});

const parseHeroes = (source) => parseResource(source, (hero) => ({ key: hero.id, value: new Hero(hero) }));

const parseItems = (source) => parseResource(source, (item) => {
    if (hasProperty(item, "id") && hasProperty(item, "name") && hasProperty(item, "states")) {
        return { key: item.id, value: new Item(item.id, item.name, item.states) };
    }
    return null;
});

const parseElements = (source) => parseResource(source, (element) => {
    if (hasProperty(element, "id") && hasProperty(element, "name") && hasProperty(element, "states")) {
        return { key: element.id, value: new Element(element.id, element.name, element.states) };
    }
    return null;
});

const parseScenes = (source) => {

    const temporyCache = new Cache();

    temporyCache.append(parseResource(source, (scene) => {

        let elementsIDs = null;
        if (hasProperty(scene, "elems")) {
            if (scene.elems instanceof Array) {
                elementsIDs = scene.elems.map((element) => element.id);
            }
            temporyCache.append(parseElements(scene.elems));
        }

        if (hasProperty(scene, "dialogs")) {
            temporyCache.append(parseDialogs(scene.dialogs));
        }

        if (hasProperty(scene, "id") && hasProperty(scene, "name")) {
            return { key: scene.id, value: new Scene(scene.id, scene.name, elementsIDs) };
        }
        return null;

    }));

    return temporyCache;
};


export {
    parseDialogs,
    parseElements,
    parseFlags,
    parseHeroes,
    parseItems,
    parseScenes
};
