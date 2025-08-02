import Plugin from "src/plugin-system/plugin.class.js";

export default class ExamplePlugin extends Plugin {
    static options = {};

    init() {}

    sayHello() {
        return "Hello World!";
    }
}
