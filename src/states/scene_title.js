
import TextComponent from "../../lib/JST/dom/text_component.js";

import Wrapper from "../ui/wrapper.js";


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
        this.#titleText.setText(title);
    }

};


export default SceneTitle;
