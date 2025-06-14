"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series1Contestants = exports.TimKey = exports.RomeshRanganathan = exports.RoisinConaty = exports.JoshWiddicombe = exports.FrankSkinner = void 0;
const Contestant_1 = require("../../Contestant");
const Enums_1 = require("../../Enums");
exports.FrankSkinner = new Contestant_1.Contestant({
    firstName: 'Frank',
    lastName: 'Skinner',
    series: Enums_1.SeriesEnum.One,
    age: 58
});
exports.JoshWiddicombe = new Contestant_1.Contestant({
    firstName: 'Josh',
    lastName: 'Widdicombe',
    series: [Enums_1.SeriesEnum.One, Enums_1.SeriesEnum.CoC1],
    age: [32, 34]
});
exports.RoisinConaty = new Contestant_1.Contestant({
    firstName: 'Roisin',
    lastName: 'Conaty',
    series: Enums_1.SeriesEnum.One,
    age: 36
});
exports.RomeshRanganathan = new Contestant_1.Contestant({
    firstName: 'Romesh',
    lastName: 'Ranganathan',
    series: Enums_1.SeriesEnum.One,
    age: 37
});
exports.TimKey = new Contestant_1.Contestant({
    firstName: 'Tim',
    lastName: 'Key',
    series: Enums_1.SeriesEnum.One,
    age: 39
});
exports.series1Contestants = [exports.FrankSkinner, exports.JoshWiddicombe, exports.RoisinConaty, exports.RomeshRanganathan, exports.TimKey];
