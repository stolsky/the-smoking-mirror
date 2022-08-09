
import Wrapper from "./Wrapper.js";


const Transition = class extends Wrapper {

    constructor(className) {
        super("Transition Maximize");
        this.addClass(className);
    }

};


export default Transition;
