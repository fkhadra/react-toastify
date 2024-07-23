"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var vite_plugin_istanbul_1 = require("vite-plugin-istanbul");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_react_1.default)(),
        (0, vite_plugin_istanbul_1.default)({
            cypress: true,
            requireEnv: false
        })
    ]
});
