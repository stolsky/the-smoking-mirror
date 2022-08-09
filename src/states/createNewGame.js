
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Cache from "../../lib/JST/resource/Cache.js";

import { loadActScript, loadItems, loadScenes } from "../core/resource_loader.js";
import { importFlags, importHeroes, importItems, importScenes } from "../core/resource_importer.js";

import GameStatesManager from "./GameStatesManager.js";


const createNewGame = () => {
    loadActScript("paris1").then(({ active, flags, heroes, intro, name, scenes, start }) => {

        const elements = new Cache();
        if (isNotEmptyString(flags)) {
            elements.append(importFlags(flags.split(",")));
        }
        elements.append(importHeroes(heroes));
        Promise.all([loadItems(), loadScenes(scenes.split(","))]).then((result) => {

            elements.append(importItems(result[0]));
            elements.append(importScenes(result[1]));

            GameStatesManager.notify("runGame", { name, start, hero: active, elements });

            if (intro) {
                GameStatesManager.notify("gameIntro", intro);
            }
        });
    });
};


export default createNewGame;
