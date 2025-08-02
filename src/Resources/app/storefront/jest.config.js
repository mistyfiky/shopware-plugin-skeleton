module.exports = {
    cacheDirectory: "<rootDir>/.jestcache",
    collectCoverage: true,
    coverageReporters: ["lcov", "text", "clover"],
    modulePaths: [
        "<rootDir>",
        "<rootDir>/../../../../vendor/shopware/platform/src/Storefront/Resources/app/storefront",
    ],
    setupFilesAfterEnv: [
        "<rootDir>/../../../../vendor/shopware/platform/src/Storefront/Resources/app/storefront/jest.init.js",
    ],
    testEnvironment: "jsdom",
    testMatch: ["**/test/**/*.test.js"],
};
