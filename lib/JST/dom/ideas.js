// import { is_not_empty_string, is_string } from "./helper.js";
// import { translate } from "./language.js";


// /** HTMLElement $Element.
//  *
//  * @param {string} tag_name The tag name of the html element. If not set, the element will not be created.
//  * @param {string} class_name This name is used as CSS class name and so for the design of the HTML element.
//  */
// const $Element = class {

//     constructor(tag_name, class_name = null) {

//         /** @type {HTMLElement} */
//         this.dom_node = {};

//         this.dom_node = document.createElement(tag_name.toLowerCase());
//         if (this.dom_node instanceof HTMLUnknownElement) {
//             this.dom_node = document.createElement("div");
//         }
//         this.dom_node.$Element = this;

//         if (is_not_empty_string(class_name)) {
//             // deal with multiple class names in one string
//             class_name.match(/\w+/g).forEach((name) => this.dom_node.classList.add(name));
//         }

//     }

//     /** Factory method for creating instances of the $Element class.
//      *
//      * @param {string} tag_name
//      * @param {string} class_name
//      *
//      * @returns {$Element}
//      */
//     static factory(tag_name, class_name) {
//         return new $Element(tag_name, class_name);
//     }

//     /**
//      * @param {string} className
//      *
//      * @returns {$Element}
//      */
//     addClassName(className) {
//         if (is_not_empty_string(className)) {
//             this.dom_node.classList.add(className);
//         }
//         return this;
//     }

//     /**
//      * @param {string} type
//      * @param {Function} method
//      *
//      * @returns {$Element}
//      */
//     addEventListener(type, method) {
//         if (is_not_empty_string(type) && method instanceof Function) {
//             this.dom_node.addEventListener(type, method);
//         }
//         return this;
//     }

//     /** Appends a $Element instance and returns itself.
//      *
//      * @param  {$Element} node
//      *
//      * @returns {$Element}
//      */
//     append(node) {
//         if (node instanceof $Element) {
//             this.dom_node.appendChild(node);
//         }
//         return this;
//     }

//     clear() {
//         this.dom_node.innerHTML = "";
//     }

//     /**
//      * @param {string} query CSS query
//      *
//      * @returns {$Element}
//      */
//     find(query) {
//         return this.dom_node.querySelector(query).$Element;
//     }

//     /**
//      * @returns {HTMLElement}
//      */
//     get element() {
//         return this.dom_node;
//     }

//     /**
//      * @param {string} className
//      *
//      * @returns {$Element}
//      */
//     removeClassName(className) {
//         if (is_not_empty_string(className)) {
//             this.dom_node.classList.remove(className);
//         }
//         return this;
//     }

//     /**
//      * @param {Object} attributes
//      *
//      * @returns {$Element}
//      */
//     setAttribute(attributes) {
//         if (attributes instanceof Object) {
//             // key can only be a string because of the method `Object.keys()`, so there is no object injection possible
//             // eslint-disable-next-line security/detect-object-injection
//             Object.keys(attributes).forEach((key) => this.dom_node.setAttribute(key, String(attributes[key])));
//         }
//         return this;
//     }

//     /**
//      *
//      * @param {string} text
//      * @returns {$Element}
//      */
//     setText(text) {
//         if (is_string(text)) {
//             this.dom_node.textContent = translate(text, this.dom_node);
//         }
//         return this;
//     }
// };

// const $Button = class extends $Element {

//     constructor(class_name = null, action = null) {

//         super("button", `Button ${class_name}`);

//         this.addEventListener("click", action);
//     }

//     static factory_text_button(text, class_name, action) {
//         const button = new $Button(`Text ${class_name}`, action);
//         button.setText(text);
//         return button;
//     }

//     static factory_icon_button(icon_class_name, action) {
//         return new $Button(`Icon ${icon_class_name}`, action);
//     }
// };

// const $Dialog = class extends $Element {

//     constructor(title = "", message = "", visible = false) {

//         super("div", "Overlay");

//         const header = $Element.factory("div", "Header");
//         this.title = $Element.factory("h2", "Title").setText(title);
//         const hide_button = $Button.factory_icon_button("Close", this.hide());

//         this.body = $Element.factory("div", "Message");
//         if (is_not_empty_string(message)) {
//             this.body.append($Element.factory("p", "Text").setText(message));
//         }

//         const footer = $Element.factory("div", "ButtonPanel").append($Button.factory_text_button("%BUTTON_CONFIRM%", "Confirm", this.hide()));

//         super.append($Element.factory("div", "Dialog")
//             .append(header
//                 .append(this.title)
//                 .append(hide_button))
//             .append(this.body)
//             .append(footer));

//         this.setVisibility(visible);
//     }

//     static factory(title, message, visible) {
//         return new $Dialog(title, message, visible);
//     }

//     /** Adds instances of $Element class to the body of the dialog.
//      * Provides the possibility to overwrite the old content.
//      *
//      * @param {$Element} element
//      *
//      * @returns {DialogWrapper}
//      */
//     append(element, overwrite = false) {
//         if (element instanceof $Element) {
//             if (overwrite) {
//                 this.body.clear();
//             }
//             this.body.append(element);
//         }
//         return this;
//     }

//     /**
//      *
//      * @param {string} title
//      * @returns {$Dialog}
//      */
//     setTitle(title) {
//         this.title.setText(title);
//         return this;
//     }

//     /**
//      *
//      * @param {boolean} visible default `true`
//      *
//      * @returns {$Dialog}
//      */
//     setVisibility(visible = true) {
//         this.dom_node.style.display = (visible) ? "block" : "none";
//         return this;
//     }
// };


// export {
//     $Button,
//     $Dialog,
//     $Element
// };
