
import {Container, Fx, TextButton, TextComponent} from "../lib/dom_connectors.js";
import {EventType, hasProperty, isFunction, isString} from "../lib/js_tools.js";
import {Application} from "../lib/gui.js";


/** @type {Application} */
let app = null;

const HIGHLIGHT = "Highlight";

export const Log = (function () {

    let container = null;

    const core = {};

    core.init = function () {
        container = new Container("Log");
    };

    core.add = function (text, narrator = null) {
        if (isString(text)) {
            const message = new Container("Message");

            if (isString(narrator)) {
                message.addComponent(new TextComponent(narrator, "Narrator"));
            }

            message.addComponent(new TextComponent(text, "Text"));

            container.addComponent(message, 0);
            Fx.scrollTop(container, 0);
        }
    };

    core.clear = function () {
        if (container instanceof Container) {
            container.clear();
        }
    };

    core.getContainer = () => container;

    return Object.freeze(core);
})();

export const Inventory = (function () {

    let items = {};

    /** @type {Container} */
    let container = null;

    const hasItem = (id) => isString(id) && hasProperty(items, id);

    const core = {};

    core.init = function () {
        container = new Container("Inventory");
    };

    core.clear = function () {

        items = {};

        if (container instanceof Container) {
            container.clear();
        }
    };

    /**
     * @param {string} id
     * @param {boolean} visible
     * @param {string} type
     * @param {string} name
     * @param {string} info
     * @param {string} foreground
     * @param {string} background
     * @param {Function} action
     */
    core.render = function (id, visible, type, name, info, foreground, background, action) {
        if (isString(id)) {

            const elem = new Container("Item");

            if (hasItem(id)) {
                container.replaceComponent(elem, items[id]);
            } else {
                container.addComponent(elem);
            }

            if (isString(type)) {
                elem.addClass(type);
            }

            if (isString(name)) {
                elem.addComponent(new TextComponent(name, "Name"));
            }

            if (isString(info)) {
                elem.addComponent(new TextComponent(info, "Info"));
            }

            if (isString(foreground)) {
                elem.setStyle("color", `rgb(${foreground})`);
            }

            // TODO if 2 colors present -> create linear gradient
            if (isString(background)) {
                elem.setStyle("background-color", `rgba(${background}, 0.5)`);
            }

            if (isFunction(action)) {
                elem.addEventListener(EventType.mouseup, action);
            }

            items[id] = elem;
        }
    };

    core.highlight = function (id) {
        if (hasItem(id)) {
            items[id].addClass("Highlight");
        }
    };

    core.removeHighlights = function () {
        Object.values(items).forEach(
            /** @param {Container} item */
            item => {
                if (item.hasClass(HIGHLIGHT)) {
                    item.removeClass(HIGHLIGHT);
                }
            }
        );
    };

    core.remove = function (id) {
        if (hasItem(id)) {
            items[id].remove();
            delete items[id];
        }
    };

    core.getContainer = () => container;

    return Object.freeze(core);
})();

export const Scene = (function () {

    let elements = {};

    /** @type {Container} */
    let container = null;
    /** @type {Container} */
    let title = null;
    /** @type {TextComponent} */
    let titleText = null;

    const hasElement = (id) => isString(id) && hasProperty(elements, id);

    const core = {};

    core.init = function () {
        title = new Container("Title");
        titleText = new TextComponent();
        title.addComponent(titleText);
        container = new Container("Scene");
    };

    /** @param {string} val */
    core.setTitle = function (val) {
        titleText.text = val;
    };

    core.clear = function () {

        elements = {};

        if (titleText instanceof TextComponent) {
            titleText.text = "";
        }
        if (container instanceof Container) {
            container.clear();
        }
    };

    /**
     * @param {string} id
     * @param {boolean} visible
     * @param {string} type
     * @param {string} name
     * @param {string} info
     * @param {string} foreground
     * @param {string} background
     * @param {Function} action
     */
    core.render = function (id, visible, type, name, info, foreground, background, action) {
        if (isString(id)) {

            const elem = new Container("Element");

            if (hasElement(id)) {
                container.replaceComponent(elem, elements[id]);
            } else {
                container.addComponent(elem);
            }

            if (visible) {

                if (isString(type)) {
                    elem.addClass(type);
                }

                if (isString(name)) {
                    elem.addComponent(new TextComponent(name, "Name"));
                }

                if (isString(info)) {
                    elem.addComponent(new TextComponent(info, "Info"));
                }

                if (isString(foreground)) {
                    elem.setStyle("color", `rgb(${foreground})`);
                }

                if (isString(background)) {
                    elem.setStyle("background-color", `rgba(${background}, 0.5)`);
                }

                if (isFunction(action)) {
                    elem.addEventListener(EventType.mouseup, action);
                }

            } else {

                elem.hide();

            }

            elements[id] = elem;
        }
    };

    core.highlight = function (id) {
        if (hasElement(id)) {
            elements[id].addClass(HIGHLIGHT);
        }
    };

    core.removeHighlights = () => Object.values(elements).forEach(elem => elem.removeClass(HIGHLIGHT));

    core.remove = function (id) {
        if (hasElement(id)) {
            elements[id].remove();
            delete elements[id];
        }
    };

    core.getContainer = () => container;
    core.getTitle = () => title;

    return Object.freeze(core);
})();

export const Dialogue = (function () {

    /** @type {Container} */
    let container = null;
    /** @type {Container} */
    let dialogue = null;
    /** @type {Container} */
    let topics = null;

    const core = {};

    core.init = function () {

        container = new Container("Dialogue");
        dialogue = new Container("Box");
        topics = new Container("Topics");

        container.append(
            dialogue,
            topics
        );

        core.hide();
    };

    core.TYPE = Object.freeze({
        SPEECH: 0,
        SOUND: 1,
        THOUGHT: 2
    });

    core.addMessage = function (name, text, type) {

    };

    core.show = function () {
        if (container instanceof Container) {
            container.show();
        }
    };

    core.hide = function () {
        if (container instanceof Container) {
            container.hide();
        }
    };

    core.getContainer = () => container;

    core.clear = function () {

        if (dialogue instanceof Container) {
            dialogue.clear();
        }

        core.hide();

    };

    return Object.freeze(core);
})();

export const Overlay = (function () {

    /** @type {Container} */
    let container = null;
    /** @type {TextComponent} */
    let title = null;
    /** @type {TextComponent} */
    let text = null;
    /** @type {TextComponent} */
    let hint = null;

    const core = {};

    core.init = function () {

        container = new Container("Overlay");
        container.addEventListener(EventType.mouseup, () => {
            core.hide();
        });

        title = new TextComponent(null, "Title");
        text = new TextComponent(null, "Text");
        hint = new TextComponent(null, "Hint");

        container.append(
            title,
            text,
            hint
        );

        core.hide();

    };

    /** @param {string} val */
    core.setTitle = function (val) {
        if (title instanceof TextComponent) {
            title.text = val;
        }
    };

    /** @param {string} val */
    core.setText = function (val) {
        if (text instanceof TextComponent) {
            text.text = val;
        }
    };

    /** @param {string} val */
    core.setHint = function (val) {
        if (hint instanceof TextComponent) {
            hint.text = val;
        }
    };

    core.show = function () {
        if (container instanceof Container) {
            container.show();
        }
    };

    core.hide = function () {
        if (container instanceof Container) {
            container.hide();
        }
    };

    core.getContainer = () => container;

    core.clear = function () {

        if (title instanceof TextComponent) {
            title.text = "";
        }

        if (text instanceof TextComponent) {
            text.text = "";
        }

        if (hint instanceof TextComponent) {
            hint.text = "";
        }

        core.hide();

    };

    return Object.freeze(core);
})();

export const Menu = (function () {

    let container = null;

    let title = null;
    let subtitle = null;

    let buttons = null;

    let disclaimer = null;

    const core = {};

    core.init = function () {

        container = new Container("Menu");
        container.addClass("Center");

        title = new TextComponent(null, "Title");
        subtitle = new TextComponent(null, "SubTitle");

        const titleBox = new Container("TitleBox");
        titleBox.append(title, subtitle);

        buttons = new Container("ButtonBox");

        disclaimer = new TextComponent(null, "Disclaimer");

        container.append(titleBox, buttons, disclaimer);

    };

    core.setTitle = function (val) {
        if (title instanceof TextComponent) {
            title.text = val;
        }
    };

    core.setSubTitle = function (val) {
        if (subtitle instanceof TextComponent) {
            subtitle.text = val;
        }
    };

    core.addButton = function (text, action) {
        if (buttons instanceof Container) {
            buttons.addComponent(new TextButton(text, action));
        }
    };

    core.clearButtons = function () {
        if (buttons instanceof Container) {
            buttons.clear();
        }
    };

    core.setDisclaimer = function (val) {
        if (disclaimer instanceof TextComponent) {
            disclaimer.text = val;
        }
    };

    core.show = function () {
        if (container instanceof Container) {
            container.show();
        }
    };

    core.hide = function () {
        if (container instanceof Container) {
            container.hide();
        }
    };

    core.getContainer = () => container;

    return Object.freeze(core);
})();

export const setup = function (title) {

    app = new Application(title);
    app.addClass("Center");
    app.setTitle(title);
    app.setContextMenuEnabled(false);

    Menu.init();
    Menu.hide();
    app.getRootPane().addComponent(Menu.getContainer());
};

export const initGameUI = function (listener) {

    Overlay.init();
    Scene.init();
    Log.init();
    Inventory.init();
    Dialogue.init();

    const gameUI = new Container("GameUI");
    gameUI.addClass("Maximize");
    gameUI.append(
        Overlay.getContainer(),
        Scene.getTitle(),
        Scene.getContainer(),
        Log.getContainer(),
        Dialogue.getContainer(),
        Inventory.getContainer()
    );
    app.getRootPane().addComponent(gameUI);

    if (isFunction(listener)) {
        gameUI.addEventListener(EventType.mouseup, listener);
    }
};

export const clear = function () {
    app.getRootPane().clear();
    Overlay.clear();
    Scene.clear();
    Log.clear();
    Inventory.clear();
    Dialogue.clear();
};
