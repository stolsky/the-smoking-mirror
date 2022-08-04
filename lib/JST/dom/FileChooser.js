
import { isString } from "../native/typeCheck.js";
import Container from "./Container.js";
import { InputComponent, InputType } from "./InputComponent.js";
import TextButton from "./TextButton.js";


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
