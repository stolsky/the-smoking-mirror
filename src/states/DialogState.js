
const DialogState = class {

    #toRender;

    #toAnimate;

    #wrapper;

    constructor(data) {

        // create components
        //this.#wrapper = new ...

        this.#toRender = true;
    }

    enter() {
        // set initial values
        return this;
    }

    exit() {
        // remove intro components
        return this;
    }

    render(ctx) {
        if (this.#toRender) {
            // add intro component to screen
            ctx.addComponent(this.#wrapper);
            this.#toRender = false;
        }
        if (this.#toAnimate) {
            // render animation
            this.#toAnimate = false;
        }
    }

    update() {
        // calculate animation
        return this;
    }

};


export default DialogState;
