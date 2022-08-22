
import Cache from "../../lib/JST/resource/Cache.js";

import { loadActScript, loadItems, loadScenes } from "../core/resource_loader.js";
import { importFlags, importHeroes, importItems, importScenes } from "../core/resource_importer.js";

import GameStatesManager from "./GameStatesManager.js";


const createNewGame = () => {
    loadActScript("paris1").then(({ active, flags, heroes, intro, name, scenes, start }) => {

        const elements = new Cache();
        elements.append(importFlags(flags));
        elements.append(importHeroes(heroes));

        // TODO refactor
        Promise.all([loadItems(), loadScenes(scenes.split(","))]).then((result) => {

            elements.append(importItems(result[0]));
            elements.append(importScenes(result[1]));

            GameStatesManager.notify("runGame", { name, start, hero: active, elements });

            const { title, text } = intro;
            if (text instanceof Array) {
                text.reverse().forEach((part, index, arr) => {
                    GameStatesManager.notify("textPage", { name: "Intro", title: (index === arr.length - 1) ? title : "", text: part });
                });
            }
        });
    });
};


export default createNewGame;
