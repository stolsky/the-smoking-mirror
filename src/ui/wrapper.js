
import Container from "../../lib/JST/dom/Container.js";


const Wrapper = class extends Container {

    /** @param {} renderer */
    render(renderer) {
        renderer.addComponent(this.getHTMLElement());
        return this;
    }

};


export default Wrapper;
