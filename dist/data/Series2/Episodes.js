"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series2eps = void 0;
const Enums_1 = require("../../Enums");
const Episode_1 = require("../../Episode");
const Contestants_1 = require("./Contestants");
const Tasks_1 = require("./Tasks");
const FearOfFailure = new Episode_1.Episode({
    name: 'Fear of failure',
    seriesEp: 1,
    series: Enums_1.SeriesEnum.Two,
    first: Contestants_1.RichardOsman,
    second: Contestants_1.JonRichardson,
    third: Contestants_1.KatherineRyan,
    fourth: Contestants_1.DocBrown,
    fifth: Contestants_1.JoeWilkinson,
    firstPoints: 20,
    secondPoints: 18,
    thirdPoints: 17,
    fourthPoints: 9,
    fifthPoints: 8,
    tasks: Tasks_1.series2ep1tasks
});
const PorkIsASausage = new Episode_1.Episode({
    name: 'Pork is a sauage',
    seriesEp: 2,
    series: Enums_1.SeriesEnum.Two,
    first: Contestants_1.JonRichardson,
    firstPoints: 25,
    second: Contestants_1.KatherineRyan,
    secondPoints: 19,
    third: Contestants_1.DocBrown,
    thirdPoints: 18,
    fourth: Contestants_1.RichardOsman,
    fourthPoints: 15,
    fifth: Contestants_1.JoeWilkinson,
    fifthPoints: 13,
    tasks: Tasks_1.series2ep2tasks
});
const PistachioEclair = new Episode_1.Episode({
    name: 'A pistachio eclair',
    seriesEp: 3,
    series: Enums_1.SeriesEnum.Two,
    first: Contestants_1.KatherineRyan,
    firstPoints: 30,
    second: Contestants_1.RichardOsman,
    secondPoints: 27,
    third: Contestants_1.JoeWilkinson,
    thirdPoints: 25,
    fourth: Contestants_1.DocBrown,
    fourthPoints: 21,
    fifth: Contestants_1.JonRichardson,
    fifthPoints: 17,
    tasks: Tasks_1.series2ep3tasks
});
exports.series2eps = [FearOfFailure, PorkIsASausage, PistachioEclair];
