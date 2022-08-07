
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
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
            const { key, value } = method(element);
            if (isNotEmptyString(key) && value) {
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

const importHeroes = (source) => importResource(source, (hero) => {
    const { id, name, states } = hero;
    return { key: id, value: new Hero(id, name, states) };
});


const importItems = (source) => importResource(source, (item) => {
    const { id, name, states } = item;
    return { key: id, value: new Item(id, name, states) };
});

const importElements = (source) => importResource(source, (element) => {
    const { id, name, states } = element;
    return { key: id, value: new Element(id, name, states) };
});

const importScenes = (source) => {

    const temporyCache = new Cache();

    temporyCache.append(importResource(source, (scene) => {

        let elementsIDs = null;
        const { id, name, elems, dialogs } = scene;
        if (elems) {
            if (scene.elems instanceof Array) {
                elementsIDs = scene.elems.map((element) => element.id);
            }
            temporyCache.append(importElements(scene.elems));
        }

        if (dialogs) {
            temporyCache.append(importDialogs(scene.dialogs));
        }

        if (id && name) {
            return { key: id, value: new Scene(id, name, elementsIDs) };
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
