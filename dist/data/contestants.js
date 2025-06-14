"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contestants = void 0;
const Contestants_1 = require("./Series1/Contestants");
const Contestants_2 = require("./Series2/Contestants");
exports.contestants = [
    ...Contestants_1.series1Contestants, ...Contestants_2.series2Contestants
];
