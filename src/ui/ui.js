
import { EventType, hasProperty, isFunction, isString } from "../../lib/JST/native/type_check.js";
import Container from "../../lib/JST/dom/container.js";
import TextComponent from "../../lib/JST/dom/text_component.js";
//import Fx from "../lib/JST/dom/fx.js";

// export const Overlay = (() => {

//     /** @type {Container} */
//     let container = null;
//     /** @type {TextComponent} */
//     let title = null;
//     /** @type {TextComponent} */
//     let text = null;
//     /** @type {TextComponent} */
//     let hint = null;

//     const core = {};

//     core.init = () => {

//         container = new Container("Overlay");
//         container.addEventListener(EventType.mouseup, () => {
//             core.hide();
//         });

//         title = new TextComponent(null, "Title");
//         text = new TextComponent(null, "Text");
//         hint = new TextComponent(null, "Hint");

//         container.append(
//             title,
//             text,
//             hint
//         );

//         core.hide();

//     };

//     /** @param {string} val */
//     core.setTitle = (val) => {
//         if (title instanceof TextComponent) {
//             title.text = val;
//         }
//     };

//     /** @param {string} val */
//     core.setText = (val) => {
//         if (text instanceof TextComponent) {
//             text.text = val;
//         }
//     };

//     /** @param {string} val */
//     core.setHint = (val) => {
//         if (hint instanceof TextComponent) {
//             hint.text = val;
//         }
//     };

//     core.show = () => {
//         if (container instanceof Container) {
//             container.show();
//         }
//     };

//     core.hide = () => {
//         if (container instanceof Container) {
//             container.hide();
//         }
//     };

//     core.getContainer = () => container;

//     core.clear = () => {

//         if (title instanceof TextComponent) {
//             title.text = "";
//         }

//         if (text instanceof TextComponent) {
//             text.text = "";
//         }

//         if (hint instanceof TextComponent) {
//             hint.text = "";
//         }

//         core.hide();

//     };

//     return Object.freeze(core);
// })();
