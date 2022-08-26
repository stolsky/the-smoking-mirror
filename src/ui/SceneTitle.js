
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import getWord from "../core/translate.js";

import Wrapper from "./Wrapper.js";


const SceneTitle = class extends Wrapper {

    /** @type {TextComponent} */
    #titleText;

    constructor(title) {

        super("Title");

        this.#titleText = new TextComponent(null, "Title");
        this.addComponent(this.#titleText);

        this.setTitle(title);
    }

    setTitle(title) {
        this.#titleText.setText(getWord(title));
    }

};


export default SceneTitle;
