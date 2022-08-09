
import Container from "../../lib/JST/dom/Container.js";


const Wrapper = class extends Container {

    /** @param {Container} renderer */
    render(renderer) {
        renderer.addComponent(this);
        return this;
    }

};


export default Wrapper;
