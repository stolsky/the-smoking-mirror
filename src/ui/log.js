
import { isString, isNotEmptyString } from "../../lib/JST/native/typeCheck.js";
import Container from "../../lib/JST/dom/Container.js";
import TextComponent from "../../lib/JST/dom/TextComponent.js";

import Wrapper from "./Wrapper.js";


const Log = class extends Wrapper {


    constructor() {
        super("Log");
    }

    add(text, narrator = null) {

        if (isNotEmptyString(text)) {

            const message = new Container("Message");

            if (isString(narrator)) {
                message.addComponent(new TextComponent(narrator, "Narrator"));
            }

            message.addComponent(new TextComponent(text, "Text"));

            this.addComponent(message, 0);

            // TODO rewrite scroll up method
            //Fx.scrollTop(container, 0);

        }

    }

};


export default Log;
