
import { isString } from "../native/type_check.js";
import Component from "./component.js";


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
