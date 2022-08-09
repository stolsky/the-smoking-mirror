
import { isString } from "../native/typeCheck.js";
import Component from "./Component.js";


const ResourceComponent = class extends Component {

    /** @type {String} */
    #src;

    /** @param {string} path */
    setSrc(path) {
        if (isString(path)) {
            this.#src = path;
            this.setAttribute("src", path);
        }
        return this;
    }

    getSrc() {
        return this.#src;
    }

};


export default ResourceComponent;
