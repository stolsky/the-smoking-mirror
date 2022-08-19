
import TextPage from "../ui/TextPage.js";

import GameStatesManager from "./GameStatesManager.js";
import State from "./State.js";


const TextPageState = class extends State {

    /** @param {{name: string, title: string, text: string}} */
    constructor({ name, title, text }) {

        super();

        this.setUI(
            new TextPage(name)
                .setTitle(title)
                .setText(text)
                .setHint("clickToContinue")
                .addPointerListener()
        );

        this.setInputHandler(
            () => { GameStatesManager.notify("done"); }
        );
    }

};


export default TextPageState;
