
import { isNotEmptyString } from "../../lib/JST/native/type_check.js";
import { loadJSON } from "../../lib/JST/resource/loaders.js";
import * as Lang from "../../lib/JST/resource/lang.js";


let current_script_id = null;

/** Returns a word from a dictionary based on the `word_id`. The associated dictionary is selected based on the prefix of the specified `word_id`.
 *
 * @param {string} word_id
 *
 * @returns {string}
 */
const getWord = (word_id) => {
    if (isNotEmptyString(word_id)) {
        let pack = null;
        if (word_id.startsWith(current_script_id)) {
            pack = current_script_id;
        }
        return Lang.getWord(word_id, pack);
    }
    return null;
};

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
const loadScript = async (scriptName = null) => {

    if (isNotEmptyString(scriptName)) {

        // load scene script and corresponding language package
        const data = await loadJSON(
            `dat/scenes/${scriptName}.json`,
            `dat/locale/${scriptName}_${Lang.getCurrentLanguage()}.json`
        );

        // remove old language pack
        if (isNotEmptyString(current_script_id)) {
            Lang.removeLanguagePack(current_script_id);
        }

        // store new script id
        current_script_id = data[0].id;

        // set new language package
        Lang.addLanguagePack(data[1], current_script_id);

        return data[0];
    }

    return null;
};


export {
    getWord,
    hasSaveGame,
    loadScript,
    loadSavedGame
};
