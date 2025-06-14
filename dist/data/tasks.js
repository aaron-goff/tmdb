"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const Tasks_1 = require("./Series1/Tasks");
const Tasks_2 = require("./Series2/Tasks");
exports.tasks = [
    ...Tasks_1.series1tasks, ...Tasks_2.series2tasks
];
