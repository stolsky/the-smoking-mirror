import Dialog from "../ui/Dialog.js";


const DialogState = class {

    #toRender;

    #toAnimate;

    #wrapper;

    constructor({ dialog }) {

        // create components
        this.#wrapper = new Dialog();

        this.#toRender = true;
    }

    enter() {
        return this;
    }

    exit() {
        return this;
    }

    render(ctx) {
        if (this.#toRender) {
            // add intro component to screen
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        return this;
    }

};


export default DialogState;
