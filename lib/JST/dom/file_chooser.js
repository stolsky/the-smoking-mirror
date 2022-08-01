
import { isString } from "../native/type_check.js";
import Container from "./container.js";
import { InputComponent, InputType } from "./input_component.js";
import TextButton from "./text_button.js";


const FileChooser = class extends Container {

    /** @type {InputComponent} */
    #file_chooser;

    constructor(button_text, on_select_action) {

        super("FileChooser");

        const use_button_text = (isString(button_text)) ? button_text : "Select File";

        this.#file_chooser = new InputComponent(InputType.File)
            .setAttribute("accept", ".fc.json")
            .hide()
            .addEventListener("change", () => {
                if (on_select_action instanceof Function) {
                    on_select_action(this.#file_chooser.getHTMLElement().files);
                }
            });

        this.append(
            this.#file_chooser,
            new TextButton(use_button_text, (event) => {
                this.#file_chooser.getHTMLElement().click();
                event.preventDefault();
                event.stopPropagation();
            })
        );

    }
};


export default FileChooser;
