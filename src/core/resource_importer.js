
import { hasProperty } from "../../lib/JST/native/typeCheck.js";
import Cache from "../../lib/JST/resource/Cache.js";

import Dialog from "../am/Dialog.js";
import Element from "../am/Element.js";
import Flag from "../am/Flag.js";
import Hero from "../am/Hero.js";
import Item from "../am/Item.js";
import Scene from "../am/Scene.js";


/** @returns {Cache} */
const importResource = (source, method) => {

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

const importDialogs = (source) => importResource(source, (dialog) => ({ key: dialog.id, value: new Dialog(dialog.id, dialog.states) }));

const importFlags = (source) => importResource(source, (flag) => {
    const [id, type, value] = flag.split(":");
    return { key: id, value: new Flag(id, type, value) };
});

const importHeroes = (source) => importResource(source, (hero) => ({ key: hero.id, value: new Hero(hero) }));

const importItems = (source) => importResource(source, (item) => {
    if (hasProperty(item, "id") && hasProperty(item, "name") && hasProperty(item, "states")) {
        return { key: item.id, value: new Item(item.id, item.name, item.states) };
    }
    return null;
});

const importElements = (source) => importResource(source, (element) => {
    if (hasProperty(element, "id") && hasProperty(element, "name") && hasProperty(element, "states")) {
        return { key: element.id, value: new Element(element.id, element.name, element.states) };
    }
    return null;
});

const importScenes = (source) => {

    const temporyCache = new Cache();

    temporyCache.append(importResource(source, (scene) => {

        let elementsIDs = null;
        if (hasProperty(scene, "elems")) {
            if (scene.elems instanceof Array) {
                elementsIDs = scene.elems.map((element) => element.id);
            }
            temporyCache.append(importElements(scene.elems));
        }

        if (hasProperty(scene, "dialogs")) {
            temporyCache.append(importDialogs(scene.dialogs));
        }

        if (hasProperty(scene, "id") && hasProperty(scene, "name")) {
            return { key: scene.id, value: new Scene(scene.id, scene.name, elementsIDs) };
        }
        return null;

    }));

    return temporyCache;
};


export {
    importDialogs,
    importElements,
    importFlags,
    importHeroes,
    importItems,
    importScenes
};
