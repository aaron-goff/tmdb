"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series1tasks = exports.series1ep3tasks = exports.series1ep2tasks = exports.series1ep1tasks = void 0;
const Helpers_1 = require("../../Helpers");
const Task_1 = require("../../Task");
const Contestants_1 = require("./Contestants");
class Series1Task extends Task_1.Task {
    constructor(data) {
        super({
            ...data,
            series: 1,
            participants: data.participants ? data.participants : Contestants_1.series1Contestants
        });
    }
}
const series1ep1task1 = new Series1Task({
    name: 'Most Unusual Item',
    episode: 1,
    points: Helpers_1.standardScoring,
    categories: ['Prize', 'Unusual'],
    isPrizeTask: true,
    location: 'Studio',
    completelyObjective: false,
    order: [Contestants_1.TimKey, Contestants_1.FrankSkinner, Contestants_1.RomeshRanganathan, Contestants_1.RoisinConaty, Contestants_1.JoshWiddicombe]
});
const series1ep1task2 = new Series1Task({
    name: 'Eat the most Watermelon',
    episode: 1,
    points: Helpers_1.standardScoring,
    categories: ['Eat', 'Watermelon'],
    location: 'Lab',
    completelyObjective: true,
    order: [Contestants_1.RomeshRanganathan, Contestants_1.TimKey, Contestants_1.JoshWiddicombe, Contestants_1.FrankSkinner, Contestants_1.RoisinConaty]
});
const series1ep1task3 = new Series1Task({
    name: 'Paint a horse while riding a horse',
    episode: 1,
    points: Helpers_1.standardScoring,
    categories: ["Paint", "Horse"],
    location: 'Barn',
    completelyObjective: false,
    order: [Contestants_1.FrankSkinner, Contestants_1.RomeshRanganathan, Contestants_1.JoshWiddicombe, Contestants_1.TimKey, Contestants_1.RoisinConaty]
});
const series1ep1task4 = new Series1Task({
    name: 'Completely empty this bathtub',
    episode: 1,
    points: Helpers_1.standardScoring,
    categories: ["Bathtub", "Empty"],
    location: 'Yard',
    completelyObjective: true,
    order: [Contestants_1.RomeshRanganathan, Contestants_1.FrankSkinner, Contestants_1.JoshWiddicombe, Contestants_1.RoisinConaty, Contestants_1.TimKey]
});
const series1ep1task5 = new Series1Task({
    name: 'Pop up a tent, get in a tent, zip up the tent, put on a onesie',
    episode: 1,
    points: Helpers_1.standardScoring,
    categories: ["Tent", "Live", "Onesie"],
    isLiveTask: true,
    location: 'Studio',
    completelyObjective: false,
    order: [Contestants_1.TimKey, Contestants_1.FrankSkinner, Contestants_1.JoshWiddicombe, Contestants_1.RomeshRanganathan, Contestants_1.RoisinConaty]
});
const series1ep1task6 = new Series1Task({
    name: 'Find Alex',
    episode: 1,
    points: [],
    categories: ["Tiebreak", "Find", "Alex"],
    isTiebreak: true,
    location: 'House',
    completelyObjective: true,
    order: [Contestants_1.FrankSkinner, Contestants_1.RomeshRanganathan]
});
const series1ep2task1 = new Series1Task({
    name: 'Most impressive item',
    episode: 2,
    points: Helpers_1.standardScoring,
    categories: ['Prize', 'Impressive'],
    isPrizeTask: true,
    location: 'Studio',
    completelyObjective: false,
    order: [Contestants_1.TimKey, Contestants_1.FrankSkinner, Contestants_1.RoisinConaty, Contestants_1.JoshWiddicombe, Contestants_1.RomeshRanganathan]
});
const series1ep2task2 = new Series1Task({
    name: 'High-five a 55-year-old',
    episode: 2,
    points: Helpers_1.standardScoring,
    categories: ['High-five', '55'],
    location: 'Mall',
    completelyObjective: true,
    order: [Contestants_1.JoshWiddicombe, Contestants_1.RoisinConaty, Contestants_1.TimKey, Contestants_1.FrankSkinner, Contestants_1.RomeshRanganathan]
});
const series1ep2task3 = new Series1Task({
    name: 'Identify the contents of these pies',
    episode: 2,
    points: Helpers_1.standardScoring,
    categories: ['Pies', 'Identify'],
    location: 'Lab',
    completelyObjective: true,
    order: [Contestants_1.TimKey, Contestants_1.RoisinConaty, Contestants_1.RomeshRanganathan, Contestants_1.JoshWiddicombe, Contestants_1.FrankSkinner]
});
const series1ep2task4 = new Series1Task({
    name: 'Do something that will look impressive in reverse',
    episode: 2,
    points: [5, 5, 4, 3, 1],
    categories: ['Impressive', 'Reverse'],
    location: 'Various',
    completelyObjective: false,
    isVisualEditing: true,
    order: [Contestants_1.RoisinConaty, Contestants_1.RomeshRanganathan, Contestants_1.JoshWiddicombe, Contestants_1.TimKey, Contestants_1.FrankSkinner]
});
const series1ep2task5 = new Series1Task({
    name: 'Crack the code, unshackle yourself and sprint 1 metre',
    episode: 2,
    points: Helpers_1.standardScoring,
    categories: ['Live', 'Crack', 'Unshackle', 'Sprint'],
    location: 'Studio',
    completelyObjective: true,
    isLiveTask: true,
    order: [Contestants_1.RoisinConaty, Contestants_1.RomeshRanganathan, Contestants_1.JoshWiddicombe, Contestants_1.TimKey, Contestants_1.FrankSkinner]
});
const series1ep3task1 = new Series1Task({
    name: 'Most meaningful item',
    episode: 3,
    points: Helpers_1.standardScoring,
    categories: ['Prize', 'Meaningful'],
    location: 'Studio',
    completelyObjective: false,
    isPrizeTask: true,
    order: [Contestants_1.RomeshRanganathan, Contestants_1.FrankSkinner, Contestants_1.TimKey, Contestants_1.JoshWiddicombe, Contestants_1.RoisinConaty]
});
const series1ep3task2 = new Series1Task({
    name: 'Throw a teabag into a mug',
    episode: 3,
    points: [5, 4, 3, 2],
    categories: ['Throw', 'Teabag', 'Mug'],
    location: 'Various',
    completelyObjective: true,
    order: [Contestants_1.TimKey, Contestants_1.FrankSkinner, Contestants_1.RomeshRanganathan, Contestants_1.RoisinConaty, Contestants_1.JoshWiddicombe]
});
const series1ep3task3 = new Series1Task({
    name: 'Using this device to track your route, create the best image for the Taskmaster',
    episode: 3,
    points: Helpers_1.standardScoring,
    categories: ['Device', 'Track', 'Image'],
    location: 'Various',
    completelyObjective: false,
    order: [Contestants_1.JoshWiddicombe, Contestants_1.RomeshRanganathan, Contestants_1.TimKey, Contestants_1.FrankSkinner, Contestants_1.RoisinConaty]
});
const series1ep3task4 = new Series1Task({
    name: 'Buy the best present for the Taskmaster',
    episode: 3,
    points: Helpers_1.standardScoring,
    categories: ['Present', '20'],
    location: 'Studio',
    isCompletedInStudio: true,
    completelyObjective: false,
    order: [Contestants_1.JoshWiddicombe, Contestants_1.RoisinConaty, Contestants_1.FrankSkinner, Contestants_1.RomeshRanganathan, Contestants_1.TimKey]
});
const series1ep3task5 = new Series1Task({
    name: 'Get this egg as high as possible',
    episode: 3,
    points: [5, 4, 0, 0, 0],
    categories: ['Egg', 'High'],
    location: 'House',
    completelyObjective: true,
    order: [Contestants_1.JoshWiddicombe, Contestants_1.RomeshRanganathan, Contestants_1.FrankSkinner, Contestants_1.RoisinConaty, Contestants_1.TimKey]
});
const series1ep3task6 = new Series1Task({
    name: 'Stand up after 100 seconds',
    episode: 3,
    points: [5, 4, 4, 2, 1],
    categories: ['Stand', '100', 'Live'],
    location: 'Studio',
    completelyObjective: true,
    isLiveTask: true,
    order: [Contestants_1.JoshWiddicombe, Contestants_1.RomeshRanganathan, Contestants_1.TimKey, Contestants_1.FrankSkinner, Contestants_1.RoisinConaty]
});
const series1ep3task7 = new Series1Task({
    name: 'What is Frank Skinner\'s age in minutes',
    episode: 3,
    points: [],
    isTiebreak: true,
    categories: ['Tiebreak', 'Frank Skinner', 'Age'],
    completelyObjective: true,
    location: 'Studio',
    order: [Contestants_1.JoshWiddicombe, Contestants_1.RomeshRanganathan]
});
exports.series1ep1tasks = [series1ep1task1, series1ep1task2, series1ep1task3, series1ep1task4, series1ep1task5, series1ep1task6];
exports.series1ep2tasks = [series1ep2task1, series1ep2task2, series1ep2task3, series1ep2task4, series1ep2task5];
exports.series1ep3tasks = [series1ep3task1, series1ep3task2, series1ep3task3, series1ep3task4, series1ep3task5, series1ep3task6, series1ep3task7];
exports.series1tasks = [...exports.series1ep1tasks, ...exports.series1ep2tasks, ...exports.series1ep3tasks];
