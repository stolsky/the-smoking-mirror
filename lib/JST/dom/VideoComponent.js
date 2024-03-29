
import AbstractMediaComponent from "./AbstractMediaComponent.js";


const VideoComponent = class extends AbstractMediaComponent {

    /**
     * @param {string} resourcePath
     * @param {string} className
     */
    constructor(resourcePath = null, className = null) {
        super("video", className);
        this.setSrc(resourcePath);
    }

};


export default VideoComponent;
