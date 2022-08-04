
import { EventType } from "../../lib/JST/native/typeCheck.js";

import GameStates from "./GameStates.js";
import Intro from "../ui/Intro.js";
import getWord from "../core/translate.js";


const GameIntroState = class {

    #toRender;

    #data;

    /** @type {Intro} */
    #wrapper;

    constructor(data) {

        this.#data = data;

        this.#wrapper = new Intro();
        this.#wrapper
            .setTitle(getWord(this.#data.title))
            .setText(getWord(this.#data.text))
            .setHint(getWord("clickToContinue"))
            .addEventListener(EventType.mouseup, () => GameStates.pop());

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        // remove intro components
        this.#data = null;
        this.#wrapper.remove();
        this.#wrapper = null;
        this.#toRender = false;
    }

    /** @param {Container} ctx */
    render(ctx) {
        if (this.#toRender) {
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        // calculate animation
        return this;
    }

};


export default GameIntroState;
