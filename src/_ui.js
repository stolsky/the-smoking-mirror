
import {DebugMode, isBoolean, isFunction, isNumber, isString} from "./utilities.js";


// Event Queue
const EQ = (function () {

    let queue = [];

    const addFromObject = function (obj) {
        if (obj.hasOwnProperty("id") && isString(obj.id)
        && obj.hasOwnProperty("func") && isFunction(obj.func)
        && obj.hasOwnProperty("iter") && isNumber(obj.iter)) {
            queue.push(obj);
        }
    };

    const addFromArray = function (arr) {
        arr.forEach(elem => addFromObject(elem));
    };

    const core = {};

    core.add = function (param) {
        if (param instanceof Array) {
            addFromArray(param);
        } else if (param instanceof Object) {
            addFromObject(param);
        }
    };

    core.exec = function (id) {
        if (isString(id)) {
            const index = queue.findIndex(elem => elem.id === id);
            if (index !== -1) {
                queue[index].func();
                if (queue[index].once) {
                    queue.splice(index, 1);
                }
            }
        } else {
            queue = queue.filter(elem => {
                elem.func();
                // -1 => endless loop
                if (elem.iter > 0) {
                    elem.iter = elem.iter - 1;
                }
                return elem.iter > 0 || elem.iter === -1;
            });
        }
        // console.table(queue);
    };

    return Object.freeze(core);
})();



// MAIN APPLICATION CONTAINER
let app = null;
let offX = 0;
let offY = 0;
// used by textbox, menu, etc.. blocks other interactions with app
let modal = false;

const center = function (elem) {
    if (elem instanceof HTMLElement) {
        const parent = elem.parentNode;

        if (parent) {

            let parentWidth = parent.offsetWidth;
            let parentHeight = parent.offsetHeight;
            if (parent === document.body) {
                parentWidth = window.innerWidth;
                parentHeight = window.innerHeight;
            }

            // POSITION X/LEFT
            elem.style.left = Math.ceil((parentWidth - elem.offsetWidth) * 0.5) + "px";
            // POSITION Y/TOP
            elem.style.top = Math.ceil((parentHeight - elem.offsetHeight) * 0.5) + "px";

        } else if (DebugMode.is()) {
            console.warn("NO PARENT ELEMENT", elem);
        }
    }
};
const create = (tag, className = null, content) => {
    const elem = document.createElement((isString(tag)) ? tag : "div");
    if (isString(className)) {
        elem.className = className;
    }

    if (content instanceof HTMLElement) {
        elem.appendChild(content);
    } else if (isString(content)) {
        elem.innerHTML = content;
    } else if (content instanceof Array) {
        content.forEach(e => (e instanceof HTMLElement) ? elem.appendChild(e) : null);
    }

    return elem;
};


export const createContainer = function (className = "Container", parent = app || document.body) {

    const container = create("div", className);

    if (parent instanceof HTMLElement) {
        parent.appendChild(container);
    }

    return container;
};
export const createButton = function (className = null, labelText = "Button", listener = null) {
    const button = create("span", className, labelText);
    if (listener instanceof Object) {
        for (const event in listener) {
            if (listener.hasOwnProperty(event)) {
                const func = listener[event];
                if (func instanceof Function) {
                    button[event] = func;
                }
            }
        }
    }
    return button;
};

export const createDisclaimer = function (label, text, confirm) {
    const disclaimer = createContainer("Disclaimer");
    disclaimer.append(
        createButton("Button", label, confirm),
        create("p", "Information", text)
    );
    app.appendChild(disclaimer);
    center(disclaimer);
};

export const Textbox = (function () {

    const core = {};

    let dom = null;

    core.init = function () {
        dom = createContainer("TextBox");
    };

    core.open = (message, narrator = null, exec = false) => {
        if (isString(message)) {
            const msg = create("p", "Message");
            if (isString(narrator)) {
                msg.appendChild(create("p", "Name", narrator));
            }
            msg.appendChild(create("p", "Text", message));
            dom.prepend(msg);
        }

        /*
        while (dom.clientHeight >= 600) {
            dom.removeChild(dom.lastChild);
        }*/

        if (exec) {
            EQ.exec();
        }
    };

    return Object.freeze(core);
})();

export const Viewport = (function () {

    const core = {};

    let scene = null;
    let sceneTitle = null;

    core.init = function () {
        sceneTitle = createContainer("Title");
        scene = createContainer("Scene");
    };

    core.setSceneListener = function (listener) {
        if (scene && isFunction(listener)) {
            scene.onmouseup = listener;
        }
    };

    core.clearScene = function () {
        if (scene) {
            scene.innerHTML = "";
        }
    };
    core.removeElement = function (elem) {
        if (elem instanceof HTMLElement) {
            scene.removeChild(elem);
        }
    };

    core.setTitle = function (title) {
        if (isString(title)) {
            sceneTitle.innerHTML = title;
        }
    };
    // ELEMENT SETTERS
    core.setType = function (elem, val) {
        if (elem instanceof HTMLElement && isString(val)) {
            elem.className = "Element " + val;
        }
    };
    core.setName = function (elem, val) {
        if (elem instanceof HTMLElement && isString(val)) {
            elem.querySelector(".Name").innerHTML = val;
        }
    };
    core.setColors = function (elem, colors) {
        if (elem instanceof HTMLElement && colors instanceof Object) {
            let val = "";
            // set foreground
            if (colors.hasOwnProperty("fore") && isString(colors.fore)) {
                if (colors.fore[0] === "#") {
                    val = colors.fore;
                } else if (colors.fore.includes(",")) {
                    val = "rgba(" + colors.fore + ", 0.5)";
                }
                elem.style.color = val;
            }
            val = "";
            // set background
            if (colors.hasOwnProperty("back") && isString(colors.back)) {
                if (colors.back[0] === "#") {
                    val = colors.back;
                } else if (colors.back.includes(",")) {
                    val = "rgba(" + colors.back + ", 0.5)";
                }
                elem.style.background = val;
            }
        }
    };
    core.setInfo = function (elem, val) {
        if (elem instanceof HTMLElement && isString(val)) {
            if (val.length > 0) {
                val = "(" + val.replace(/;/, " ") + ")";
            }
            elem.querySelector(".Info").innerHTML = val;
        }
    };
    // core.Viewport.setMoveable = function (elem, val) {};
    core.setVisibility = function (elem, bool) {
        if (elem instanceof HTMLElement && scene.contains(elem) && isBoolean(bool)) {
            elem.style.display = (bool) ? "block" : "none";
        }
    };
    core.updateElement = function (elem, type, name, info, colors, visible) {
        core.setType(elem, type);
        core.setName(elem, name);
        core.setInfo(elem, info);
        core.setColors(elem, colors);
        core.setVisibility(elem, visible);
    };
    core.addElement = function (type, name, info, colors, func) {

        const dom = create("p", "Element " + type, [
            create("span", "Name", name),
            create("span", "Info")
        ]);

        core.setInfo(info);
        core.setColors(dom, colors);

        if (isFunction(func)) {
            dom.onmouseup = (event) => {
                if (!modal) {
                    event.stopPropagation();
                    const response = func(event.button);
                    Textbox.open(response.text, response.narrator, response.exec);
                }
            };
        }

        dom.style.display = "none";
        scene.appendChild(dom);

        return dom;
    };

    return Object.freeze(core);
})();

export const Inventory = (function () {

    const core = {};

    let dom = null;

    core.init = function () {

        dom = createContainer("Inventory");

    };

    core.addItem = function (elem) {
        if (dom && elem instanceof HTMLElement) {
            dom.appendChild(elem);
        }
    };

    core.removeItem = function (elem) {
        if (dom && elem instanceof HTMLElement) {
            dom.removeChild(elem);
        }
    };

    core.createItem = function (name, func) {

        const item = create("p", "Item", [
            create("span", "Name", name)
        ]);

        if (isFunction(func)) {
            item.onmouseup = (event) => {
                if (!modal) {
                    event.stopPropagation();
                    const response = func(event.button);
                    Textbox.open(response.text, response.narrator, response.exec);
                }
            };
        }

        return item;
    };

    return Object.freeze(core);
})();

// DEVELOPMENT
const setHighlight = function (obj, highlight = true) {
    if (obj instanceof HTMLElement) {
        if (highlight) {
            obj.className = obj.className + " Highlight";
        } else {
            obj.className = obj.className.replace(/ Highlight/, "");
        }
    }
};
export const startCombination = function (obj) {
    setHighlight(obj);
};
export const addCombination = function (obj) {
    setHighlight(obj);
};
export const removeCombination = function (obj) {
    setHighlight(obj, false);
};
export const stopCombination = function () {
    //
};

// EVENT API INTERFACE
export const addEvent = EQ.add;

export const initGame = function () {
    // UI.createMenu("MenuIcon");
    Viewport.init();
    Textbox.init();
    Inventory.init();
};
export const setup = function (title, attr = {}) {

    document.title = (isString(title)) ? title : "My Application";

    window.addEventListener("resize", () => {
        center(app);
    });

    app = createContainer("Application");
    if (attr.center) {
        center(app);
    }
    offX = app.offsetLeft;
    offY = app.offsetTop;

};
export const clear = function () {
    if (app instanceof HTMLElement) {
        app.innerHTML = "";
    }
};
