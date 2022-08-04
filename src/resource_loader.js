
import { isNotEmptyString } from "../lib/JST/native/typeCheck.js";
import { loadJSON } from "../lib/JST/resource/loaders.js";
import { getCurrentLanguage } from "../lib/JST/resource/Lang.js";

import { setDictionary } from "./translate.js";


/**
 * @param {string} scriptName
 *
 * @returns {Promise}
 */
const loadSavedGame = (saveGameName = null) => new Promise((resolve, reject) => {

    if (isNotEmptyString(saveGameName)) {

        resolve();
    }

    reject();
});

// TODO implement save game check
const hasSaveGame = () => false;

/**
 * @param {string} scriptName
 *
 * @returns {Promise}
 */
const loadActScript = async (scriptName = null) => {

    if (isNotEmptyString(scriptName)) {

        // load scene script and corresponding language package
        const data = await loadJSON(
            `dat/scenes/${scriptName}.json`,
            `dat/locale/${scriptName}_${getCurrentLanguage()}.json`
        );

        setDictionary(data[0].id, data[1]);

        return data[0];
    }

    return null;
};

/** @returns {Promise} */
const loadItems = () => loadJSON("dat/scenes/items.json");

/**
 * @param {Array} fileNames
 *
 * @returns {Promise}
 */
const loadScenes = (fileNames) => loadJSON(...fileNames.map((fileName) => `dat/scenes/${fileName}.json`));


export {
    hasSaveGame,

    loadActScript,
    loadItems,
    loadScenes,
    loadSavedGame
};
