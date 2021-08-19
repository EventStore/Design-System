"use strict";
exports.__esModule = true;
exports.workerPath = void 0;
var path_1 = require("path");
/**
 * Path to the location of the webworkers
 * Include the workers in your stencil project by adding them to "copy" in your stencil config.
 */
exports.workerPath = path_1.join(path_1.dirname(require.resolve('@eventstore/editor/package.json')), 'workers');
