
import Component from "../dom/Component.js";


// const CanvasRenderer = class extends Renderer {};
const CanvasComponent = class extends Component {

    /** @param {string} className */
    constructor(className = null) {
        super("canvas", className);
    }

    getContext() {
        return super.tag.getContext("2d");
    }

};


export default { CanvasComponent };
