
import Wrapper from "./Wrapper.js";


const Transition = class extends Wrapper {

    constructor(color) {

        super("Transition Maximize");

        this.setStyle("background-color", color);
    }

};


export default Transition;
