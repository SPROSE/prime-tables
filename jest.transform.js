/**
 * author: richard.sproson.
 * date: 13.10.2018.
 * file: jest.transform.js.
 * description: Custom Jest transform implementation that wraps babel-jest and injects
 * babel presets, so we don't have to use .babelrc.
 */

module.exports = require('babel-jest').createTransformer({
    presets: ['babel-preset-react','babel-preset-env'].map(require.resolve), // or whatever
});