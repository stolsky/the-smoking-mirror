
import {hasProperty, isBoolean, isNumber, isString} from "../lib/js_tools.js";

// TODO create State class ???

const BaseObject = class {

    constructor (id, name = "Object", states = null) {

        this._id = (isString(id)) ? id : "obj";
        this.name = name;

        this.info = "";

        // foreground color
        this.foreground = "0,0,0";

        // background color
        this.background = "255,255,255";

        this.states = states;

        // current state
        this._now = null;

        this._expl = false;
    }

    getId () {
        return this._id;
    }

    set name (name) {
        if (isString(name)) {
            this._name = name;
        }
    }
    get name () {
        return this._name;
    }

    set info (info) {
        if (isString(info, true)) {
            this._info = info;
        }
    }
    get info () {
        return this._info;
    }

    set foreground (color) {
        if (isString(color)) {
            this._fore = color;
        }
    }
    get foreground () {
        return this._fore;
    }

    set background (color) {
        if (isString(color)) {
            this._back = color;
        }
    }
    get background () {
        return this._back;
    }

    set colors (colors = {}) {
        if (hasProperty(colors, "foreground")) {
            this.foreground = colors.foreground;
        }
        if (hasProperty(colors, "background")) {
            this.background = colors.background;
        }
    }
    get colors () {
        return {foreground: this.foreground, background: this.background};
    }

    /** @param {Array<Object>} states */
    set states (states) {
        if (states instanceof Array) {

            this._states = states.map(state => {
                // TODO
                return {...state, ...{leftIndex: 0, rightIndex: 0}}
            });
        }
    }
    get states () {
        return this._states;
    }

    set currentState (id) {
        if (isNumber(id) && this._states instanceof Array) {
            if (id === 0) {
                this._now = null;
            } else {
                this._now = this._states.find(state => state.id === id);
            }
        }
    }
    get currentState () {
        return this._now;
    }

    getLeftAction () {

        let action = null;

        if (this._now && hasProperty(this._now, "left")) {

            action = this._now.left[this._now.leftIndex];

            if (this._now.leftIndex < this._now.left.length - 1) {
                this._now.leftIndex = this._now.leftIndex + 1;
            }

            if (hasProperty(action, "dupe")) {
                this._now.rightIndex = this._now.rightIndex + 1;
            }
        }

        return action;
    }
    getRightAction () {

        let action = null;

        if (this._now && hasProperty(this._now, "right")) {

            action = this._now.right[this._now.rightIndex];

            if (this._now.rightIndex < this._now.right.length - 1) {
                this._now.rightIndex = this._now.rightIndex + 1;
            }

            if (hasProperty(action, "dupe")) {
                this._now.leftIndex = this._now.leftIndex + 1;
            }
        }

        return action;
    }

    getCombinations () {
        return (this._now && hasProperty(this._now, "comb")) ? this._now.comb : null;
    }

    isExlored () {
        return this._expl;
    }

};

export const Item = class extends BaseObject {

    constructor (id = "item", name = "Item", states, initState = 1) {
        super(id, name, states);

        this.updateState(initState);
    }

    updateState (id) {

        super.currentState = id;
        const now = super.currentState;
        if (now) {
            super.info = now.info;
            super.name = now.name;
            super.foreground = now.fore;
            super.background = now.back;
        }
    }

};

export const Element = class extends BaseObject {

    constructor (id = "elem", name = "Element", states, initState = 1) {

        super(id, name, states);

        this.type = "Look";
        this.moveable = false;
        this.visible = true;

        this.updateState(initState);
    }

    set type (type) {
        if (isString(type)) {
            this._type = type;
        }
    }
    get type () {
        return this._type;
    }

    set visible (bool) {
        if (isBoolean(bool)) {
            this._visible = bool;
        }
    }
    get visible () {
        return this._visible;
    }

    set moveable (bool) {
        if (isBoolean(bool)) {
            this._moveable = bool;
        }
    }
    get moveable () {
        return this._moveable;
    }

    updateState (id) {
        super.currentState = id;
        const now = super.currentState;
        if (now) {
            this.type = now.type;
            super.info = now.info;
            super.name = now.name;
            super.foreground = now.fore;
            super.background = now.back;
            this.moveable = now.moveable;
            this.visible = now.visible;
        }
    }

};

export const Scene = class {

    /**
     * @param {string} id
     * @param {string} name
     * @param {Array<string>} elements
     */
    constructor (id, name, elements) {

        this._id = (isString(id)) ? id : "scene";
        this._name = (isString(name)) ? name : "Scene";

        /** @type {Array<string>} */
        this._elements = [];

        this.addAllElements(elements);

    }

    getId () {
        return this._id;
    }

    getName () {
        return this._name;
    }

    hasElement (id) {
        return isString(id) && this._elements.includes(id);
    }

    addElement (id = "elem") {
        if (!this.hasElement(id)) {
            this._elements.push(id);
        }
    }

    addAllElements (list) {
        if (list instanceof Array) {
            list.forEach(id => this.addElement(id));
        }
    }

    /** @returns {Array<string>} */
    getAllElements () {
        return this._elements;
    }

};

export const Inventory = class {

    constructor (items = []) {

        /** @type {Array<string>} */
        this._store = [];

        this.addAll(items);

    }

    /** @param {string} id */
    addItem (id) {
        if (isString(id)) {
            if (!this.hasItem(id)) {
                this._store.push(id);
            }
        }
    }

    addAll (list) {
        if (list instanceof Array) {
            list.forEach(item => this.addItem(item));
        }
    }

    getAll () {
        return this._store;
    }

    /**
     * @param {string} id
     *
     * @returns {boolean}
     */
    hasItem (id) {
        return isString(id) && this._store.includes(id);
    }

    removeItem (id) {
        if (this.hasItem(id)) {
            const index = this._store.indexOf(id);
            this._store.splice(index, 1);
        }
    }

};

export const Hero = class extends Element {

    constructor (id, name, states = {}, items = []) {

        super(id, name, states);

        this._inv = new Inventory(items);
    }

    /** @returns {Inventory} */
    getInventory () {
        return this._inv;
    }

};
