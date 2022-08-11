
import { appendToBody, disableContextMenu, setDocumentTitle } from "./basic.js";
import Container from "./Container.js";
import { isBoolean, isString } from "../native/typeCheck.js";


const AbstractApplication = class extends Container {

    /** @param {string} title */
    constructor(title = null) {

        super("Application");

        AbstractApplication.setTitle(title);

        this.addClass((isString(title)) ? title.replace(/\s/g, "") : title);

        appendToBody(this.getHTMLElement());
    }

    /** @param {string} title */
    static setTitle(title) {
        setDocumentTitle(title);
        return this;
    }

    /** @param {boolean} enable */
    static setContextMenuEnabled(enable = true) {
        if (isBoolean(enable) && !enable) {
            disableContextMenu();
        }
        return this;
    }

};


export default AbstractApplication;
