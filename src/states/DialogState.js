import Dialog from "../ui/Dialog.js";


const DialogState = class {

    #toRender;

    #wrapper;

    constructor(properties) {

        console.log(properties);

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
            this.#wrapper.render(ctx);
            this.#toRender = false;
        }
    }

    update() {
        return this;
    }

};


export default DialogState;
