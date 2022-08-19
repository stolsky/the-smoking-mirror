/* eslint-disable no-unused-expressions */
/* global beforeEach, describe, expect, it */
/// <reference types="Cypress" />

import Inventory from "../../src/am/Inventory.js";


describe("Testing instantiation of inventory class", () => {

    it("Testing with no parameters", () => {

        const inventory = new Inventory();

        expect(inventory.has("itemID")).to.be.false;
        expect(inventory.has("")).to.be.false;
        expect(inventory.has()).to.be.false;
        expect(inventory.has(undefined)).to.be.false;
        expect(inventory.has(null)).to.be.false;
        expect(inventory.has(true)).to.be.false;

        expect(inventory.getAll()).to.be.empty;
        expect(inventory.getAll()).to.be.instanceOf(Array);

    });

    it("Testing with empty array", () => {

        const inventory = new Inventory([]);

        expect(inventory.has("itemID")).to.be.false;
        expect(inventory.has("")).to.be.false;
        expect(inventory.has()).to.be.false;
        expect(inventory.has(undefined)).to.be.false;
        expect(inventory.has(null)).to.be.false;
        expect(inventory.has(true)).to.be.false;

        expect(inventory.getAll()).to.be.empty;
        expect(inventory.getAll()).to.be.instanceOf(Array);

    });

    it("Testing with array of strings", () => {

        const inventory = new Inventory(["item1ID", "item2ID", "item3ID"]);

        expect(inventory.getAll().length).to.equal(3);
        expect(inventory.getAll()).to.be.instanceOf(Array);

        expect(inventory.has("item1ID")).to.be.true;
        expect(inventory.has("item2ID")).to.be.true;
        expect(inventory.has("item3ID")).to.be.true;

        expect(inventory.has("")).to.be.false;
        expect(inventory.has()).to.be.false;
        expect(inventory.has(undefined)).to.be.false;
        expect(inventory.has(null)).to.be.false;
        expect(inventory.has(true)).to.be.false;

    });

    it("Testing with array of wrong data types ([\"\", true, false, 0, 1, -1, undefined, null])", () => {

        const inventory = new Inventory(["", true, false, 0, 1, -1, undefined, null]);

        expect(inventory.getAll(), "expect to be empty").to.be.empty;
        expect(inventory.getAll(), "expect to be of instance Array").to.be.instanceOf(Array);

        expect(inventory.has(), "expect nothing to find without parameter").to.be.false;
        expect(inventory.has(""), "expect not to find `\"\"`").to.be.false;
        expect(inventory.has(true), "expect not to find `true`").to.be.false;
        expect(inventory.has(false), "expect not to find `false`").to.be.false;
        expect(inventory.has(0), "expect not to find `0`").to.be.false;
        expect(inventory.has(1), "expect not to find `1`").to.be.false;
        expect(inventory.has(-1), "expect not to find `-1`").to.be.false;
        expect(inventory.has(undefined), "expect not to find `undefined`").to.be.false;
        expect(inventory.has(null), "expect not to find `null`").to.be.false;

    });

});

/** @type {Inventory} */
let inventory;

beforeEach(() => {
    inventory = new Inventory();
    expect(inventory.getAll().length, "expect items/inventory to be empty").to.equal(0);
    expect(inventory.has("itemID"), "expect nothing to find before adding \"itemID\"").to.be.false;
});

describe("Test add() method on empty on iventory", () => {

    it("Test with parameter", () => {
        inventory.add("itemID");
        expect(inventory.getAll().length).to.equal(1);
        expect(inventory.has("itemID")).to.be.true;
    });

    it("Test without parameter", () => {
        inventory.add();
        expect(inventory.getAll().length, "expect items/inventory to be empty").to.equal(0);
        expect(inventory.has("itemID"), "expect nothing to find without adding an \"itemID\"").to.be.false;
    });

    it("Test with wrong parameters (\"\", null, undefined, true, false, 0, 1, -1)", () => {

        inventory.add("");
        expect(inventory.has(null), "expect not to find \"\"").to.be.false;

        inventory.add(null);
        expect(inventory.has(null), "expect not to find `null`").to.be.false;

        inventory.add(undefined);
        expect(inventory.has(undefined), "expect not to find `undefined`").to.be.false;

        inventory.add(true);
        expect(inventory.has(true), "expect not to find `true`").to.be.false;
        inventory.add(false);
        expect(inventory.has(false), "expect not to find `false`").to.be.false;

        inventory.add(0);
        expect(inventory.has(0), "expect not to find `0`").to.be.false;
        inventory.add(1);
        expect(inventory.has(1), "expect not to find `1`").to.be.false;
        inventory.add(-1);
        expect(inventory.has(-1), "expect not to find `-1`").to.be.false;

        expect(inventory.getAll().length, "expect items/inventory to be empty").to.equal(0);

    });

});

describe("Test addAll() method on empty inventory", () => {

    it("Test with no parameter", () => {
        inventory.addAll();
        expect(inventory.getAll()).to.be.empty;
        expect(inventory.getAll()).to.be.instanceOf(Array);
    });

    it("Test with array with correct values", () => {
        inventory.addAll(["item1ID", "item2ID", "item3ID"]);
        expect(inventory.getAll().length).to.be.equal(3);
        expect(inventory.has("item1ID")).to.be.true;
        expect(inventory.has("item2ID")).to.be.true;
        expect(inventory.has("item3ID")).to.be.true;
    });

    it("Test with array with wrong values", () => {

        inventory.addAll(["", true, false, 0, 1, -1, undefined, null]);

        expect(inventory.getAll(), "expect to be empty").to.be.empty;
        expect(inventory.getAll(), "expect to be of instance Array").to.be.instanceOf(Array);

        expect(inventory.has(), "expect nothing to find without parameter").to.be.false;
        expect(inventory.has(""), "expect not to find `\"\"`").to.be.false;
        expect(inventory.has(true), "expect not to find `true`").to.be.false;
        expect(inventory.has(false), "expect not to find `false`").to.be.false;
        expect(inventory.has(0), "expect not to find `0`").to.be.false;
        expect(inventory.has(1), "expect not to find `1`").to.be.false;
        expect(inventory.has(-1), "expect not to find `-1`").to.be.false;
        expect(inventory.has(undefined), "expect not to find `undefined`").to.be.false;
        expect(inventory.has(null), "expect not to find `null`").to.be.false;
    });

});

describe("Test remove() method", () => {

    it("Test without/wrong parameter on emtpy inventory", () => {

        inventory.remove();
        expect(inventory.getAll(), "expect to be empty").to.be.empty;

        inventory.remove("");
        expect(inventory.getAll(), "expect to be empty").to.be.empty;

        inventory.remove(null);
        expect(inventory.getAll(), "expect to be empty").to.be.empty;

        inventory.remove(undefined);
        expect(inventory.getAll(), "expect to be empty").to.be.empty;

        inventory.remove(true);
        expect(inventory.getAll(), "expect to be empty").to.be.empty;
        inventory.remove(false);
        expect(inventory.getAll(), "expect to be empty").to.be.empty;

        inventory.remove(0);
        expect(inventory.getAll(), "expect to be empty").to.be.empty;
        inventory.remove(1);
        expect(inventory.getAll(), "expect to be empty").to.be.empty;
        inventory.remove(-1);
        expect(inventory.getAll(), "expect to be empty").to.be.empty;

        expect(inventory.getAll(), "expect to be of instance Array").to.be.instanceOf(Array);
    });

    it("Test with parameter on emtpy inventory", () => {
        inventory.remove("itemID");
        expect(inventory.getAll(), "expect to be empty").to.be.empty;
    });

    it("Test with parameter on filled inventory", () => {
        inventory.addAll(["item1ID", "item2ID", "item3ID"]);

        expect(inventory.getAll().length).to.equal(3);
        inventory.remove("item1ID");
        expect(inventory.getAll().length).to.equal(2);

        inventory.remove("item1ID");
        expect(inventory.getAll().length, "expect the same item removed twice, changed nothing").to.equal(2);

        inventory.remove("item2ID");
        inventory.remove("item3ID");
        expect(inventory.getAll(), "expect to be empty").to.be.empty;
    });

    it("Test with wrong parameter on filled inventory", () => {
        inventory.addAll(["item1ID", "item2ID", "item3ID"]);

        inventory.remove();
        inventory.remove("");
        inventory.remove(null);
        inventory.remove(undefined);
        inventory.remove(true);
        inventory.remove(false);
        inventory.remove(0);
        inventory.remove(1);
        inventory.remove(-1);

        expect(inventory.getAll().length).to.be.equal(3);
        expect(inventory.has("item1ID")).to.be.true;
        expect(inventory.has("item2ID")).to.be.true;
        expect(inventory.has("item3ID")).to.be.true;
    });

});
