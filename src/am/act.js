
import { isNotEmptyString } from "../../lib/JST/native/type_check.js";
import Cache from "../../lib/JST/resource/cache.js";

import { loadItems, loadScenes } from "../states/resource_loader.js";
import { parseDialogs, parseFlags, parseHeroes, parseItems, parseScenes } from "../states/resource_parser.js";


const Act = class {

    #name;

    #flags;

    #elements;

    #dialogs;

    #activeHero;

    #currentScene;

    /** @param {{name: string, flags: {}, heroes: {}, scenes: {}}} script */
    constructor(script) {

        this.#name = script.name;

        this.#flags = parseFlags(script.flags.split(","));

        this.#elements = new Cache();
        this.#elements.append(parseHeroes(script.heroes));
        Promise.all([loadItems(), loadScenes(script.scenes.split(","))]).then((result) => {
            this.#elements.append(parseItems(result[0]));
            this.#elements.append(parseScenes(result[1]));
        });

        this.#dialogs = parseDialogs(script.dialogs);

    }

    getName() {
        return this.#name;
    }

    loadScene(sceneID) {

        if (isNotEmptyString(sceneID)) {
            this.#currentScene = sceneID;
        }

        //     Scenes.setCurrent(id);
        //     const scene = Scenes.getCurrent();
        //     const hero = Heroes.getCurrent();

        //     Scene.clear();
        //     Scene.setTitle(getWord(scene.getName()));

        //     renderObject(Scene, hero);

        //     Scenes.getCurrentElements().forEach((elem) => renderElement(elem));
        //     Heroes.getCurrentInventory().forEach((item) => renderObject(Inventory, item));

    }

    setActiveHero(heroID) {
        if (isNotEmptyString(heroID)) {
            this.#activeHero = heroID;
        }
    }

};


export default Act;
