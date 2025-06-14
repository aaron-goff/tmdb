"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
class Episode {
    name;
    seriesEp;
    series;
    first;
    second;
    third;
    fourth;
    fifth;
    firstPoints;
    secondPoints;
    thirdPoints;
    fourthPoints;
    fifthPoints;
    totalPoints = 0;
    prizeTask;
    liveTask;
    recordedTasks;
    additionalTasks;
    constructor(data) {
        this.name = data.name;
        this.seriesEp = data.seriesEp;
        this.series = data.series;
        this.first = [data.first];
        this.second = data.second ? Array.isArray(data.second) ? data.second : [data.second] : undefined;
        this.third = data.third ? Array.isArray(data.third) ? data.third : [data.third] : undefined;
        this.fourth = data.fourth ? Array.isArray(data.fourth) ? data.fourth : [data.fourth] : undefined;
        this.fifth = data.fifth ? Array.isArray(data.fifth) ? data.fifth : [data.fifth] : undefined;
        this.firstPoints = data.firstPoints;
        this.secondPoints = data.secondPoints;
        this.thirdPoints = data.thirdPoints;
        this.fourthPoints = data.fourthPoints;
        this.fifthPoints = data.fifthPoints;
        this.prizeTask = data.tasks.find(x => x.isPrizeTask);
        this.liveTask = data.tasks.find(x => x.isLiveTask);
        this.recordedTasks = data.tasks.filter(x => !x.isPrizeTask && !x.isLiveTask && !x.isAdditionalTask && !x.isTiebreak);
        this.additionalTasks = data.tasks.filter(x => x.isTiebreak || x.isAdditionalTask);
        this.additionalTasks = this.additionalTasks.length > 0 ? this.additionalTasks : undefined;
        this.totalPoints += this.firstPoints;
        this.totalPoints += (this.second?.length ?? 0) * this.secondPoints;
        this.totalPoints += (this.third?.length ?? 0) * (this.thirdPoints ?? 0);
        this.totalPoints += (this.fourth?.length ?? 0) * (this.fourthPoints ?? 0);
        this.totalPoints += (this.fifth?.length ?? 0) * (this.fifthPoints ?? 0);
    }
    getEpisodeUploadPayload = () => {
        return {
            Name: this.name,
            Number: this.seriesEp,
            Series: this.series,
            First: this.first.map(x => x.fullName),
            Second: this.second?.map(x => x.fullName),
            Third: this.third?.map(x => x.fullName) ?? null,
            Fourth: this.fourth?.map(x => x.fullName) ?? null,
            Fifth: this.fifth?.map(x => x.fullName) ?? null,
            'First Points': this.firstPoints,
            'Second Points': this.secondPoints,
            'Third Points': this.thirdPoints ?? null,
            'Fourth Points': this.fourthPoints ?? null,
            'Fifth Points': this.fifthPoints ?? null,
            'Prize Task': this.prizeTask.name,
            'Live Task': this.liveTask.name,
            'Recorded Tasks': this.recordedTasks.map(x => x.name),
            'Additional Tasks': this.additionalTasks && this.additionalTasks.length > 0 ? this.additionalTasks.map(x => x.name) : null,
            'Total Points': this.totalPoints
        };
    };
}
exports.Episode = Episode;
