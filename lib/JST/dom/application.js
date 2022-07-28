
import Pane from "./pane.js";
import AbstractApplication from "./abstract_application.js";


const Application = class extends AbstractApplication {

    /** @type {Pane} */
    #rootPane;

    /** @type {Array<Pane>} */
    #panes;

    /**
     * @param {string} title
     * @param {Object} options
     */
    constructor(title = null, options = null) {

        super(title);

        this.#panes = [];
        this.#rootPane = new Pane();
        this.addPane(this.#rootPane);

        this.setOptions(options);
    }

    /** @param {Object} options */
    setOptions(options) {

        if (options instanceof Object) {
            //
        }

        return this;
    }

    /** @param {Pane} pane */
    addPane(pane) {
        if (pane instanceof Pane) {
            pane.addClass("Maximize");
            super.addComponent(pane);
            this.#panes.push(pane);
        }
        return this;
    }

    /** calls Application.addPane(), so use that method instead
     *
     * @override
     *
     * @param {Pane} pane
    */
    addComponent(pane) {
        this.addPane(pane);
        return this;
    }

    /**
     * @override
     *
     * @param {Array<Pane>} panes
    */
    append(...panes) {
        if (panes instanceof Array) {
            panes.forEach((pane) => this.addPane(pane));
        }
        return this;
    }

    getRootPane() {
        return this.#rootPane;
    }

    // TODO add/set color scheme

};


export default Application;
