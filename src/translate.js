
import { isNotEmptyString } from "../lib/JST/native/type_check.js";
import * as Lang from "../lib/JST/resource/lang.js";


let current_script_id = "";

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
export { setDictionary };
