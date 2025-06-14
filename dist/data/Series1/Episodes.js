"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series1eps = void 0;
const Enums_1 = require("../../Enums");
const Episode_1 = require("../../Episode");
const Contestants_1 = require("./Contestants");
const Tasks_1 = require("./Tasks");
const MelonBuffet = new Episode_1.Episode({
    name: 'Melon buffet',
    seriesEp: 1,
    series: Enums_1.SeriesEnum.One,
    first: Contestants_1.FrankSkinner,
    second: Contestants_1.RomeshRanganathan,
    third: Contestants_1.TimKey,
    fourth: Contestants_1.JoshWiddicombe,
    fifth: Contestants_1.RoisinConaty,
    firstPoints: 19,
    secondPoints: 19,
    thirdPoints: 17,
    fourthPoints: 13,
    fifthPoints: 7,
    tasks: Tasks_1.series1ep1tasks
});
const ThePieWhisperer = new Episode_1.Episode({
    name: 'The pie whisperer',
    seriesEp: 2,
    series: Enums_1.SeriesEnum.One,
    first: Contestants_1.RoisinConaty,
    second: Contestants_1.TimKey,
    third: Contestants_1.JoshWiddicombe,
    fourth: Contestants_1.RomeshRanganathan,
    fifth: Contestants_1.FrankSkinner,
    firstPoints: 21,
    secondPoints: 18,
    thirdPoints: 16,
    fourthPoints: 14,
    fifthPoints: 9,
    tasks: Tasks_1.series1ep2tasks
});
const ThePoetAndTheEgg = new Episode_1.Episode({
    name: 'The poet and the egg',
    seriesEp: 3,
    series: Enums_1.SeriesEnum.One,
    first: Contestants_1.JoshWiddicombe,
    second: Contestants_1.RomeshRanganathan,
    third: Contestants_1.TimKey,
    fourth: Contestants_1.FrankSkinner,
    fifth: Contestants_1.RoisinConaty,
    firstPoints: 22,
    secondPoints: 22,
    thirdPoints: 16,
    fourthPoints: 15,
    fifthPoints: 9,
    tasks: Tasks_1.series1ep3tasks
});
exports.series1eps = [MelonBuffet, ThePieWhisperer, ThePoetAndTheEgg];
