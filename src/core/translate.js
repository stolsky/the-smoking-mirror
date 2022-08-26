
import { isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import * as Lang from "../../lib/JST/resource/lang.js";


let current_script_id = "";

/** Returns a word from a dictionary based on the `word_id`. The associated dictionary is selected based on the prefix of the specified `word_id`.
 *
 * @param {string} word_id
 *
 * @returns {string} empty string if no word was found in the dictionary
 */
const getWord = (word_id) => {
    if (isNotEmptyString(word_id)) {
        let pack = null;
        if (word_id.startsWith(current_script_id)) {
            pack = current_script_id;
        }
        return Lang.getWord(word_id, pack);
    }
    return "";
};

/**
 * @param {string} id
 *
 * @returns {Array<string>}
 */
const getTextAsArray = (id) => ((isNotEmptyString(id)) ? id.split("+").map((part) => getWord(part)) : []);

/**
 * @param {string} id
 *
 * @returns {string}
 */
const getText = (id) => getTextAsArray(id)?.join(" ");

const setDictionary = (id, dictionary) => {

    // remove old language pack
    if (isNotEmptyString(current_script_id)) {
        Lang.removeLanguagePack(current_script_id);
    }

    // store new script id
    current_script_id = id;

    // set new language package
    Lang.addLanguagePack(dictionary, current_script_id);

};


export default getWord;
export { getText, getTextAsArray, setDictionary };
