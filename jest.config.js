/**
 * author: richard.sproson.
 * date: 10.10.2018.
 * file: jest.config.js.
 */
 
const path = require('path');

module.exports = {
    verbose: true,
    collectCoverage: true,
    setupFiles: [
        "./jest-setup.js"
    ],
    roots: [
        "<rootDir>/src/client"
    ],
    coverageReporters: ['text', 'lcov'],
    collectCoverageFrom: [
        // "**/*.{js,jsx}",
        "src/client/app/**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/src/client/public/**"
    ],
    testMatch: [
        "**/__tests__/**/*.js?(x)",
        "**/?(*.)(spec|test).js?(x)"
    ],
    transform: {
        '^.+\\.jsx?$': './jest.transform.js',
    },
    modulePaths: [
        "<rootDir>/node_modules",
    ]
};