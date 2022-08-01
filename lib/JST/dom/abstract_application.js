
import { appendToBody, disableContextMenu, setDocumentTitle } from "./basic.js";
import Container from "./container.js";
import { isString } from "../native/type_check.js";


const AbstractApplication = class extends Container {

    /** @param {string} title */
    constructor(title = null) {

        super("Application");

        AbstractApplication.setTitle(title);

        this.addClass((isString(title)) ? title.replace(/\s/g, "_") : title);

        appendToBody(this.getHTMLElement());
    }

    /** @param {string} title */
    static setTitle(title) {
        setDocumentTitle(title);
        return this;
    }

    /** @param {boolean} enable */
    static setContextMenuEnabled(enable = true) {
        if (!enable) {
            disableContextMenu();
        }
        return this;
    }

};


export default AbstractApplication;
