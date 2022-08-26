/* eslint-disable no-unused-expressions */
/* global describe, expect, it */
/// <reference types="Cypress" />

import Scene from "../../src/am/Scene.js";


describe("Testing all public methods (interface) from Scene class", () => {

    it("Testing instantiation with no properties", () => {

        const scene = new Scene();

        expect(scene.getId()).to.be.empty;
        expect(scene.getName()).to.be.empty;
        expect(scene.getIntro()).to.be.empty;
        expect(scene.getAllElements()).to.be.empty;
        expect(scene.getAllElements()).to.be.instanceOf(Array);
        expect(scene.hasElement()).to.be.false;
        expect(scene.removeElement()).to.deep.equal(scene);

    });

    it("Testing instantiation with wrong properties (all numbers), expected id, name and intro to be treated as strings and elements will be always as array.", () => {

        const scene = new Scene({ id: 0, name: 1, intro: 2, elements: 3 });

        expect(scene.getId()).to.be.empty;
        expect(scene.getName()).to.be.empty;
        expect(scene.getIntro()).to.be.empty;
        expect(scene.getAllElements()).to.be.empty;
        expect(scene.getAllElements()).to.be.instanceOf(Array);
        expect(scene.hasElement()).to.be.false;

    });

    it("Testing instantiation with wrong properties (true), expected id, name and intro to be treated as strings and elements will be always as array.", () => {

        const scene = new Scene({ id: true, name: true, intro: true, elements: true });

        expect(scene.getId()).to.be.empty;
        expect(scene.getName()).to.be.empty;
        expect(scene.getIntro()).to.be.empty;
        expect(scene.getAllElements()).to.be.empty;
        expect(scene.getAllElements()).to.be.instanceOf(Array);
        expect(scene.hasElement()).to.be.false;

    });

    it("Testing instantiation with wrong properties (undefined), expected id, name and intro to be treated as strings and elements will be always as array.", () => {

        const scene = new Scene({ id: undefined, name: undefined, intro: undefined, elements: undefined });

        expect(scene.getId()).to.be.empty;
        expect(scene.getName()).to.be.empty;
        expect(scene.getIntro()).to.be.empty;
        expect(scene.getAllElements()).to.be.empty;
        expect(scene.getAllElements()).to.be.instanceOf(Array);
        expect(scene.hasElement()).to.be.false;

    });

    it("Testing instantiation with wrong properties (null), expected id, name and intro to be treated as strings and elements will be always as array.", () => {

        const scene = new Scene({ id: null, name: null, intro: null, elements: null });

        expect(scene.getId()).to.be.empty;
        expect(scene.getName()).to.be.empty;
        expect(scene.getIntro()).to.be.empty;
        expect(scene.getAllElements()).to.be.empty;
        expect(scene.getAllElements()).to.be.instanceOf(Array);
        expect(scene.hasElement()).to.be.false;

    });

    it("Testing instantiation with all properties, that all properties added correctly.", () => {

        const scene = new Scene({ id: "SceneID", name: "SceneName", intro: "introID", elements: ["elem1ID", "elem2ID", "elem3ID", "elem4ID"] });

        expect(scene.getId()).to.equal("SceneID");
        expect(scene.getName()).to.equal("SceneName");
        expect(scene.getIntro()).to.equal("introID");

        // TODO refactor tests into own "describe" -> "testing element methods" -> "it" for each the single methods
        const elements = scene.getAllElements();
        expect(elements.length).to.equal(4);

        elements.forEach((element) => expect(scene.hasElement(element)).to.be.true);
    });

    it("Testing hasElements if elements is empty", () => {

        const scene = new Scene();

        expect(scene.hasElement()).to.be.false;
        expect(scene.hasElement(undefined)).to.be.false;
        expect(scene.hasElement(null)).to.be.false;
        expect(scene.hasElement(true)).to.be.false;
        expect(scene.hasElement(0)).to.be.false;
        expect(scene.hasElement(-1)).to.be.false;
        expect(scene.hasElement(1)).to.be.false;
        expect(scene.hasElement("test")).to.be.false;

    });

});

describe("Testing methods that manipulate the elements.", () => {

    it("Test removeElement: remove element from empty elements", () => {

        const scene = new Scene({ id: "SceneID", name: "SceneName", intro: "introID", elements: [] });

        let elements = scene.getAllElements();
        expect(elements.length).to.equal(0);
        expect(elements).to.be.empty;

        expect(scene.removeElement("elem1ID")).to.deep.equal(scene);

        elements = scene.getAllElements();
        expect(elements.length).to.equal(0);
        expect(elements).to.be.empty;

    });

    it("Test removeElement: call method with no parameter on empty elements", () => {

        const scene = new Scene({ id: "SceneID", name: "SceneName", intro: "introID", elements: [] });

        let elements = scene.getAllElements();
        expect(elements.length).to.equal(0);
        expect(elements).to.be.empty;

        expect(scene.removeElement()).to.deep.equal(scene);

        elements = scene.getAllElements();
        expect(elements.length).to.equal(0);
        expect(elements).to.be.empty;

    });

    it("Test removeElement: remove element from elements with one member", () => {

        const scene = new Scene({ id: "SceneID", name: "SceneName", intro: "introID", elements: ["elem1ID"] });

        let elements = scene.getAllElements();
        expect(elements.length).to.equal(1);

        expect(scene.hasElement("elem1ID")).to.be.true;
        expect(scene.removeElement("elem1ID")).to.deep.equal(scene);
        expect(scene.hasElement("elem1ID")).to.be.false;

        elements = scene.getAllElements();
        expect(elements.length).to.equal(0);

    });

    it("Test removeElement: remove element from elements", () => {

        const scene = new Scene({ id: "SceneID", name: "SceneName", intro: "introID", elements: ["elem1ID", "elem2ID", "elem3ID", "elem4ID"] });

        let elements = scene.getAllElements();
        expect(elements.length).to.equal(4);

        expect(scene.hasElement("elem1ID")).to.be.true;
        expect(scene.removeElement("elem1ID")).to.deep.equal(scene);
        expect(scene.hasElement("elem1ID")).to.be.false;

        elements = scene.getAllElements();
        expect(elements.length).to.equal(3);

    });

});
