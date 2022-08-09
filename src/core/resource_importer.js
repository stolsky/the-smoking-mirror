
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

const importDialogs = (source) => importResource(source, ({ id, states }) => ({ key: id, value: new Dialog(id, states) }));

const importFlags = (source) => importResource(source, (flag) => {
    const [id, type, value] = flag.split(":");
    return { key: id, value: new Flag(id, type, value) };
});

// TODO remove duplicate code
const importHeroes = (source) => importResource(source, ({ id, name, states }) => ({ key: id, value: new Hero(id, name, states) }));
const importItems = (source) => importResource(source, ({ id, name, states }) => ({ key: id, value: new Item(id, name, states) }));
const importElements = (source) => importResource(source, ({ id, name, states }) => ({ key: id, value: new Element(id, name, states) }));

const importScenes = (source) => {

    const temporyCache = new Cache();

    temporyCache.append(importResource(source, ({ id, name, elems, dialogs }) => {

        let elementsIDs = null;

        if (elems) {
            if (elems instanceof Array) {
                elementsIDs = elems.map((element) => element.id);
            }
            temporyCache.append(importElements(elems));
        }

        if (dialogs) {
            temporyCache.append(importDialogs(dialogs));
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
