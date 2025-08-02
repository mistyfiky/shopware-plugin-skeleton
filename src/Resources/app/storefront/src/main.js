import ExamplePlugin from "./plugin/example/example.plugin";

const PluginManager = window.PluginManager;
PluginManager.register("ExamplePlugin", ExamplePlugin);
