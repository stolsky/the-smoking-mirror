
import Component from "./component.js";


const IconButton = class extends Component {

    /**
     * @param {string} iconId
     * @param {EventListener} listener
     */
    constructor(iconId, listener) {

        super("button", "Button Icon");

        this.addClass(iconId)
            .addEventListener("click", listener);

    }

};


export default IconButton;
