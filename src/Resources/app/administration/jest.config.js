const { resolve } = require("path");

process.env.ADMIN_PATH =
    process.env.ADMIN_PATH ||
    resolve(
        "../../../../vendor/shopware/platform/src/Administration/Resources/app/administration",
    );

module.exports = {
    cacheDirectory: "<rootDir>/.jestcache",
    preset: "@shopware-ag/jest-preset-sw6-admin",
    globals: {
        adminPath: process.env.ADMIN_PATH,
    },
    moduleNameMapper: {
        "^src(.*)$": ["<rootDir>/src$1", `${process.env.ADMIN_PATH}/src$1`],
        "^@shopware-ag/meteor-admin-sdk/es/(.*)": `${process.env.ADMIN_PATH}/node_modules/@shopware-ag/meteor-admin-sdk/umd/$1`,
        vue$: `${process.env.ADMIN_PATH}/node_modules/vue/dist/vue.cjs.js`,
        "^@vue/test-utils$": `${process.env.ADMIN_PATH}/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js`,
    },
    testMatch: ["<rootDir>/test/**/*.test.js"],
};
