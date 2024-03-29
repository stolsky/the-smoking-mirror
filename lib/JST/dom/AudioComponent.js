
import AbstractMediaComponent from "./AbstractMediaComponent.js";


const AudioComponent = class extends AbstractMediaComponent {

    /**
     * @param {string} resourcePath
     * @param {string} className
     */
    constructor(resourcePath = null, className = null) {

        super("audio", className);
        this.setSrc(resourcePath);

    }

};


export default AudioComponent;
