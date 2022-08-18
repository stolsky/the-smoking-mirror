
import { isNumber } from "../native/typeCheck.js";
import Container from "./Pane.js";


const ScrollPane = class extends Container {

    /** @param {Component} component */
    constructor(component) {
        super("ScrollPane");
        this.addComponent(component);
    }

    setSize(width = 0, height = 0) {
        if (isNumber(width)) {
            this.setStyle("width", `${width}px`);
        }
        if (isNumber(height)) {
            this.setStyle("width", `${height}px`);
        }
    }

    // TODO implement scroll down and up

};


export default ScrollPane;
