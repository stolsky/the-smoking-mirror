
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Cache from "../../lib/JST/resource/Cache.js";

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

/** @param {string} source */
const importFlags = (source = null) => importResource(source?.split(","), (flag) => {
    const [id, type, value] = flag.split(":");
    return { key: id, value: new Flag({ id, type, value }) };
});

const importHeroes = (source) => importResource(source, ({ id, ...properties }) => ({ key: id, value: new Hero(id, properties) }));
// TODO remove duplicate code
const importItems = (source) => importResource(source, ({ id, ...properties }) => ({ key: id, value: new Item(id, properties) }));
const importElements = (source) => importResource(source, ({ id, ...properties }) => ({ key: id, value: new Element(id, properties) }));

const importScenes = (source) => {

    const temporyCache = new Cache();

    temporyCache.append(importResource(source, ({ id, name, intro, elems, dialogs }) => {

        let elementsIDs = null;

        if (elems) {
            if (elems instanceof Array) {
                elementsIDs = elems.map((element) => element.id);
            }
            temporyCache.append(importElements(elems));
        }

        if (dialogs) {
            temporyCache.append(importItems(dialogs));
        }

        if (id && name) {
            return { key: id, value: new Scene({ id, name, intro, elements: elementsIDs }) };
        }

        return null;
    }));

    return temporyCache;
};


export {
    importElements,
    importFlags,
    importHeroes,
    importItems,
    importScenes
};
