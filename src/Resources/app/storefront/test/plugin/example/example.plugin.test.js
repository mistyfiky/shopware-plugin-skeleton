/**
 * @jest-environment jsdom
 */

import ExamplePlugin from "src/plugin/example/example.plugin";

describe("ExamplePlugin tests", () => {
    let plugin;

    beforeEach(() => {
        const mockedElement = document.createElement("div");
        plugin = new ExamplePlugin(mockedElement);
    });

    afterEach(() => {
        plugin = null;
    });

    test("The example plugin can be instantiated", () => {
        expect(plugin).toBeInstanceOf(ExamplePlugin);
    });

    test("Shows text", () => {
        expect(plugin.sayHello()).toBe("Hello World!");
    });
});
