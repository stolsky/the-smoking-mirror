/* global describe, expect, it */

import Flag from "../../src/am/Flag.js";


describe("Testing Flag class", () => {

    it("Create instance without anything", () => {
        const flag = new Flag();
        expect(flag.getId()).to.equal(undefined);
        expect(flag.getValue()).to.equal(false);
    });

    it("Create instance without type and value", () => {
        const flag = new Flag({ id: "myFlag" });
        expect(flag.getId()).to.equal("myFlag");
        expect(flag.getValue()).to.equal(false);
    });

    it("Create instance without value", () => {
        const flag = new Flag({ id: "myFlag", type: "string" });
        expect(flag.getId()).to.equal("myFlag");
        expect(flag.getValue()).to.equal("undefined");
    });

    it("Create instance with all properties using string", () => {
        const flag = new Flag({ id: "myFlag", type: "string", value: "test" });
        expect(flag.getId()).to.equal("myFlag");
        expect(flag.getValue()).to.equal("test");
        expect(flag.compareTo("test")).to.equal(true);
    });

    it("Create instance with all properties using number", () => {
        const flag2 = new Flag({ id: "myFlag", type: "number", value: "3" });
        expect(flag2.getId()).to.equal("myFlag");
        expect(flag2.getValue()).to.equal(3);
        expect(flag2.compareTo("3")).to.equal(true);
        flag2.setValue("4");
        expect(flag2.getValue()).to.equal(4);
        expect(flag2.compareTo("4")).to.equal(true);
    });

    it("Create instance with all properties using boolean", () => {
        const flag3 = new Flag({ id: "myFlag", type: "boolean", value: "true" });
        expect(flag3.getId()).to.equal("myFlag");
        expect(flag3.getValue()).to.equal(true);
        expect(flag3.compareTo("true")).to.equal(true);
        expect(flag3.compareTo("false")).to.equal(false);
    });

    it("Create instance with false type, expecting default type to be boolean and default value to be false", () => {
        const flag = new Flag({ type: "object" });
        expect(flag.getValue()).to.equal(false);
        expect(flag.compareTo("true")).to.equal(false);
        expect(flag.compareTo("false")).to.equal(true);
    });

    it("Create instance with type string and false values", () => {
        const flag = new Flag({ type: "string", value: {} });
        expect(flag.getValue()).to.equal("[object Object]");
        flag.setValue([]);
        expect(flag.getValue()).to.equal("");
    });

    it("Create instance with type number and false values", () => {
        const flag = new Flag({ type: "number", value: "test" });
        expect(flag.getValue()).to.equal(null);
        expect(flag.compareTo("test")).to.equal(false);
        expect(flag.compareTo(null)).to.equal(false);
        expect(flag.compareTo(undefined)).to.equal(false);
    });

    it("Create instance with type boolean and false values", () => {
        const flag = new Flag({ type: "boolean", value: [] });
        expect(flag.getValue()).to.equal(false);
        expect(flag.compareTo("true")).to.equal(false);
        expect(flag.compareTo("false")).to.equal(true);
    });

    it("Test the setValue method regarding the type of string", () => {
        const flag = new Flag({ id: "myFlag", type: "string" });
        flag.setValue("test");
        expect(flag.getValue()).to.equal("test");
    });

    it("Test the setValue method regarding the type of number", () => {
        const flag2 = new Flag({ id: "myFlag", type: "number" });
        flag2.setValue("3");
        expect(flag2.getValue()).to.equal(3);
        flag2.setValue(4);
        expect(flag2.getValue()).to.equal(4);
    });

    it("Test the setValue method regarding the type of boolean", () => {
        const flag3 = new Flag({ id: "myFlag", type: "boolean" });
        flag3.setValue("true");
        expect(flag3.getValue()).to.equal(true);
        flag3.setValue(false);
        expect(flag3.getValue()).to.equal(false);
    });

    it("Test the toCompare method with strings", () => {
        const flag = new Flag({ id: "myFlag", type: "string" });
        flag.setValue("test");
        expect(flag.getValue()).to.equal("test");
        expect(flag.compareTo("test")).to.equal(true);
        expect(flag.compareTo("testo")).to.equal(false);
        expect(flag.compareTo(1)).to.equal(false);
        expect(flag.compareTo(true)).to.equal(false);
    });

    it("Test the toCompare method with numbers", () => {
        const flag = new Flag({ id: "myFlag", type: "number" });
        flag.setValue(5);
        expect(flag.getValue()).to.equal(5);
        expect(flag.compareTo(5)).to.equal(true);
        expect(flag.compareTo(6)).to.equal(false);
        expect(flag.compareTo("5")).to.equal(true);
        expect(flag.compareTo("6")).to.equal(false);
        expect(flag.compareTo("testo")).to.equal(false);
        expect(flag.compareTo(true)).to.equal(false);
    });

});
