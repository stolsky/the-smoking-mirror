
import { setAttributesFromOptions } from "./basic.js";
import ResourceComponent from "./resource_component.js";


const MediaAttributes = ["autoplay", "controls", "loop", "muted"];
const AbstractMediaComponent = class extends ResourceComponent {

    play() {
        this.getHTMLElement().play();
        return this;
    }

    pause() {
        this.getHTMLElement().pause();
        return this;
    }

    setOptions(options) {
        setAttributesFromOptions(this.getHTMLElement(), options, MediaAttributes);
        return this;
    }

};


export default AbstractMediaComponent;
