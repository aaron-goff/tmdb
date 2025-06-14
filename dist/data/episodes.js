"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.episodes = void 0;
const Episodes_1 = require("./Series1/Episodes");
const Episodes_2 = require("./Series2/Episodes");
exports.episodes = [
    ...Episodes_1.series1eps,
    ...Episodes_2.series2eps
];
