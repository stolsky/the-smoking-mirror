
import { EventType } from "../../lib/JST/native/typeCheck.js";

import GameIntro from "../ui/GameIntro.js";

import GameStates from "./GameStates.js";


const GameIntroState = class {

    #toRender;

    /** @type {Intro} */
    #wrapper;

    constructor(data) {

        this.#wrapper = new GameIntro();
        this.#wrapper
            .setTitle(data.title)
            .setText(data.text)
            .setHint("clickToContinue")
            .addEventListener(EventType.mouseup, () => GameStates.pop());

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        // remove intro components
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
