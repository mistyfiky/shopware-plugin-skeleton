const { defineConfig } = require("eslint/config");
const pluginJest = require("eslint-plugin-jest");
const pluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
    {
        files: ["**/*.test.js"],
        plugins: { jest: pluginJest },
        languageOptions: {
            globals: pluginJest.environments.globals.globals,
        },
    },
    pluginPrettierRecommended,
]);
