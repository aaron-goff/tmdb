"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series2Contestants = exports.RichardOsman = exports.KatherineRyan = exports.JonRichardson = exports.JoeWilkinson = exports.DocBrown = void 0;
const Contestant_1 = require("../../Contestant");
const Enums_1 = require("../../Enums");
exports.DocBrown = new Contestant_1.Contestant({
    firstName: 'Doc',
    lastName: 'Brown',
    series: Enums_1.SeriesEnum.Two,
    age: 38
});
exports.JoeWilkinson = new Contestant_1.Contestant({
    firstName: 'Joe',
    lastName: 'Wilkinson',
    series: Enums_1.SeriesEnum.Two,
    age: 41
});
exports.JonRichardson = new Contestant_1.Contestant({
    firstName: 'Jon',
    lastName: 'Richardson',
    series: Enums_1.SeriesEnum.Two,
    age: 34
});
exports.KatherineRyan = new Contestant_1.Contestant({
    firstName: 'Katherine',
    lastName: 'Ryan',
    series: Enums_1.SeriesEnum.Two,
    placeOfBirth: Enums_1.Country.Canada,
    nationality: Enums_1.Country.Canada,
    placeOfBusiness: Enums_1.Country.UK,
    age: 34
});
exports.RichardOsman = new Contestant_1.Contestant({
    firstName: 'Richard',
    lastName: 'Osman',
    series: Enums_1.SeriesEnum.Two,
    age: 46
});
exports.series2Contestants = [exports.DocBrown, exports.JoeWilkinson, exports.JonRichardson, exports.KatherineRyan, exports.RichardOsman];
