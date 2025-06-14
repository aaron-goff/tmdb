"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.series2tasks = exports.series2ep5tasks = exports.series2ep4tasks = exports.series2ep3tasks = exports.series2ep2tasks = exports.series2ep1tasks = void 0;
const Helpers_1 = require("../../Helpers");
const Task_1 = require("../../Task");
const Contestants_1 = require("./Contestants");
class Series2Task extends Task_1.Task {
    constructor(data) {
        super({
            ...data,
            series: 2,
            participants: data.participants ? data.participants : Contestants_1.series2Contestants
        });
    }
}
const series2ep1task1 = new Series2Task({
    name: 'Most important document',
    episode: 1,
    points: [5, 4, 3, 2, 2],
    categories: ['Prize', 'Important', 'Document'],
    isPrizeTask: true,
    location: 'Studio',
    completelyObjective: false,
    order: [Contestants_1.JoeWilkinson, Contestants_1.DocBrown, Contestants_1.KatherineRyan, Contestants_1.JonRichardson, Contestants_1.RichardOsman]
});
const series2ep1task2 = new Series2Task({
    name: 'Place these three exercise balls on the yoga mat on the top of that hill',
    episode: 1,
    points: Helpers_1.standardScoring,
    categories: ['Exercise', 'Balls', 'Yoga', 'Hill'],
    location: 'Park',
    completelyObjective: true,
    order: [Contestants_1.RichardOsman, Contestants_1.JonRichardson, Contestants_1.KatherineRyan, Contestants_1.JoeWilkinson, Contestants_1.DocBrown]
});
const series2ep1task3 = new Series2Task({
    name: 'Get this potato into the golf hole',
    episode: 1,
    points: [5, 4, 3, 2],
    categories: ['Potato', 'Golf', 'Red Green'],
    location: 'Yard',
    completelyObjective: true,
    order: [Contestants_1.JonRichardson, Contestants_1.RichardOsman, Contestants_1.KatherineRyan, Contestants_1.DocBrown, Contestants_1.JoeWilkinson]
});
const series2ep1task4 = new Series2Task({
    name: 'Find out the following information from this Swedish person',
    episode: 1,
    points: Helpers_1.standardScoring,
    categories: ['Information', 'Swedish'],
    location: 'Lab',
    completelyObjective: true,
    order: [Contestants_1.KatherineRyan, Contestants_1.RichardOsman, Contestants_1.JonRichardson, Contestants_1.DocBrown, Contestants_1.JoeWilkinson]
});
const series2ep1task5 = new Series2Task({
    name: 'Pack for your holiday',
    episode: 1,
    points: [5, 4, 3, 0, 0],
    isLiveTask: true,
    categories: ['Live', 'Pack', 'Holiday'],
    location: 'Studio',
    completelyObjective: true,
    order: [Contestants_1.RichardOsman, Contestants_1.JonRichardson, Contestants_1.KatherineRyan, Contestants_1.JoeWilkinson, Contestants_1.DocBrown]
});
const series2ep2task1 = new Series2Task({
    name: 'Trendiest item of clothing',
    episode: 2,
    points: Helpers_1.standardScoring,
    isPrizeTask: true,
    categories: ['Prize', 'Trendiest', 'Clothing'],
    location: 'Studio',
    completelyObjective: false,
    order: [Contestants_1.DocBrown, Contestants_1.KatherineRyan, Contestants_1.JonRichardson, Contestants_1.JoeWilkinson, Contestants_1.RichardOsman]
});
const series2ep2task2 = new Series2Task({
    name: 'Eat an egg',
    episode: 2,
    points: [5, 4, 3, 2, 0],
    categories: ['Eat', 'Egg'],
    location: 'Lab',
    completelyObjective: true,
    order: [Contestants_1.RichardOsman, Contestants_1.DocBrown, Contestants_1.JonRichardson, Contestants_1.JoeWilkinson, Contestants_1.KatherineRyan]
});
const series2ep2task3 = new Series2Task({
    name: 'Make the best music video for a nursery rhyme',
    episode: 2,
    points: [5, 5, 4, 3, 2],
    categories: ['Music video', 'Nursery Rhyme'],
    location: 'House',
    completelyObjective: false,
    isVisualEditing: true,
    order: [Contestants_1.DocBrown, Contestants_1.JonRichardson, Contestants_1.KatherineRyan, Contestants_1.RichardOsman, Contestants_1.JoeWilkinson]
});
const series2ep2task4 = new Series2Task({
    name: 'Take a picture of an inanimate object that looks like you',
    episode: 2,
    points: Helpers_1.standardScoring,
    categories: ['Inanimate object', 'Picture'],
    location: 'Studio',
    completelyObjective: false,
    order: [Contestants_1.RichardOsman, Contestants_1.JonRichardson, Contestants_1.KatherineRyan, Contestants_1.JoeWilkinson, Contestants_1.DocBrown],
    isCompletedInStudio: true,
});
const series2ep2task5 = new Series2Task({
    name: 'Order the following pizza for the Taskmaster',
    episode: 2,
    points: Helpers_1.standardScoring,
    categories: ['Pizza', 'Order'],
    location: 'Lounge',
    completelyObjective: true,
    order: [Contestants_1.JonRichardson, Contestants_1.JoeWilkinson, Contestants_1.KatherineRyan, Contestants_1.DocBrown, Contestants_1.RichardOsman]
});
const series2ep2task6 = new Series2Task({
    name: 'Make the pizza person say the word "bubbles"',
    episode: 2,
    points: [1, 1, 1, 0, 0],
    categories: ['Pizza', 'Bubbles'],
    location: 'Lounge',
    completelyObjective: true,
    isAdditionalTask: true,
    order: [Contestants_1.DocBrown, Contestants_1.JoeWilkinson, Contestants_1.KatherineRyan, Contestants_1.JonRichardson, Contestants_1.RichardOsman]
});
const series2ep2task7 = new Series2Task({
    name: 'Using these big chopsticks, get these potatoes into your basket',
    episode: 2,
    points: [5, 4, 0, 0],
    categories: ['Chopsticks', 'Live', 'Potatoes', 'Basket'],
    location: 'Studio',
    completelyObjective: true,
    isLiveTask: true,
    order: [Contestants_1.JonRichardson, Contestants_1.KatherineRyan, Contestants_1.DocBrown, Contestants_1.JoeWilkinson, Contestants_1.RichardOsman]
});
const series2ep3task1 = new Series2Task({
    name: 'Best dinner party guest',
    episode: 3,
    points: Helpers_1.standardScoring,
    categories: ['Prize', 'Dinner', 'Guest'],
    location: 'Studio',
    completelyObjective: false,
    isPrizeTask: true,
    order: [Contestants_1.JoeWilkinson, Contestants_1.KatherineRyan, Contestants_1.DocBrown, Contestants_1.RichardOsman, Contestants_1.JonRichardson]
});
const series2ep3task2 = new Series2Task({
    name: 'Impress this mayor',
    episode: 3,
    points: Helpers_1.standardScoring,
    categories: ['Impress', 'Mayor'],
    location: 'Cheswick Town Hall',
    completelyObjective: false,
    order: [Contestants_1.KatherineRyan, Contestants_1.RichardOsman, Contestants_1.JoeWilkinson, Contestants_1.DocBrown, Contestants_1.JonRichardson]
});
const series2ep3task3 = new Series2Task({
    name: 'Make the most unexpected silhouette on this screen',
    episode: 3,
    points: Helpers_1.standardScoring,
    categories: ['Silhouette', 'Unexpected'],
    location: 'House',
    completelyObjective: false,
    order: [Contestants_1.JonRichardson, Contestants_1.RichardOsman, Contestants_1.JoeWilkinson, Contestants_1.KatherineRyan, Contestants_1.DocBrown]
});
const series2ep3task4 = new Series2Task({
    name: 'Buy a gift for the Taskmaster',
    episode: 3,
    points: Helpers_1.standardScoring,
    categories: ['Gift', 'Taskmaster'],
    location: 'Studio',
    isCompletedInStudio: true,
    completelyObjective: false,
    order: [Contestants_1.RichardOsman, Contestants_1.KatherineRyan, Contestants_1.DocBrown, Contestants_1.JoeWilkinson, Contestants_1.JonRichardson]
});
const series2ep3task5 = new Series2Task({
    name: 'Get the potato into the bandstand',
    episode: 3,
    points: [5, 5, 0, 0, 0],
    categories: ['Potato', 'Bandstand', 'Blindfold', 'Earplugs', 'Speak'],
    location: 'Bandstand',
    completelyObjective: false,
    isTeamTask: true,
    order: [Contestants_1.JonRichardson, Contestants_1.RichardOsman, Contestants_1.DocBrown, Contestants_1.JoeWilkinson, Contestants_1.KatherineRyan]
});
const series2ep3task6 = new Series2Task({
    name: 'Throw the rabbits into your hat',
    episode: 3,
    points: [15, 12, 12, 7, 4],
    categories: ['Rabbits', 'Hat'],
    location: 'Studio',
    completelyObjective: true,
    isLiveTask: true,
    order: [Contestants_1.KatherineRyan, Contestants_1.DocBrown, Contestants_1.JoeWilkinson, Contestants_1.RichardOsman, Contestants_1.JonRichardson]
});
exports.series2ep1tasks = [series2ep1task1, series2ep1task2, series2ep1task3, series2ep1task4, series2ep1task5];
exports.series2ep2tasks = [series2ep2task1, series2ep2task2, series2ep2task3, series2ep2task4, series2ep2task5, series2ep2task6, series2ep2task7];
exports.series2ep3tasks = [series2ep3task1, series2ep3task2, series2ep3task3, series2ep3task4, series2ep3task5, series2ep3task6];
exports.series2ep4tasks = [];
exports.series2ep5tasks = [];
exports.series2tasks = [...exports.series2ep1tasks, ...exports.series2ep2tasks, ...exports.series2ep3tasks, ...exports.series2ep4tasks, ...exports.series2ep5tasks];
