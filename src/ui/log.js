
import { isString, isNotEmptyString } from "../../lib/JST/native/type_check.js";
import Container from "../../lib/JST/dom/container.js";
import TextComponent from "../../lib/JST/dom/text_component.js";

import Wrapper from "./wrapper.js";


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
