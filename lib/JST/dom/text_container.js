
import Container from "./container.js";


const TextContainer = class extends Container {

    /** @param {string} className */
    constructor(className = null) {
        super("p", className);
    }

};


export default TextContainer;
