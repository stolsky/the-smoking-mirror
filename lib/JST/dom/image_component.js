
import ResourceComponent from "./resource_component.js";


const ImageComponent = class extends ResourceComponent {

    /**
     * @param {string} sourcePath
     * @param {string} className
     */
    constructor(sourcePath = null, className = null) {

        super("img", className);
        this.setSrc(sourcePath);
    }

};


export default ImageComponent;
