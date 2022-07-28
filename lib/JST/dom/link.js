
import { isString } from "../native/type_check.js";
import AbstractTextComponent from "./abstract_text_component.js";


export const Link = class extends AbstractTextComponent {

    constructor(url, className = null) {

        super("a", className);

        this.setURL(url)
            .setTarget("_blank");

    }

    /** @param {string} target */
    setTarget(target) {
        if (target === "_blank" || target === "_top" || target === "_self") {
            this.setAttribute("target", target);
        }
        return this;
    }

    /** @param {string} url */
    setURL(url) {
        if (isString(url)) {
            this.setAttribute("href", url);
        }
        return this;
    }

};


export default Link;
