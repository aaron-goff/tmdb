"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    name;
    series;
    episode;
    participants;
    numOfParticipants;
    points;
    totalPoints;
    categories;
    winner;
    hasSecret;
    isTeamTask;
    isLiveTask;
    isPrizeTask;
    isTiebreak;
    isAdditionalTask;
    isVisualEditing;
    contestantsUsingVisualEditing;
    location;
    completelyObjective;
    order;
    isCompletedInStudio;
    constructor(data) {
        this.name = data.name;
        this.series = data.series;
        this.episode = data.episode;
        this.participants = data.participants;
        this.numOfParticipants = this.participants.length;
        this.points = data.points ?? [];
        this.totalPoints = this.points.length > 0 ? this.points.reduce((acc, curr) => { return acc + curr; }, 0) : undefined;
        this.categories = data.categories;
        this.hasSecret = data.hasSecret ?? false;
        this.isTeamTask = data.isTeamTask ?? false;
        this.isLiveTask = data.isLiveTask ?? false;
        this.isPrizeTask = data.isPrizeTask ?? false;
        this.isTiebreak = data.isTiebreak ?? false;
        this.isAdditionalTask = data.isAdditionalTask ?? false;
        this.isVisualEditing = data.isVisualEditing ?? false;
        this.contestantsUsingVisualEditing = data.contestantUsingVisualEditing ? Array.isArray(data.contestantUsingVisualEditing) ? data.contestantUsingVisualEditing : [data.contestantUsingVisualEditing] : undefined;
        this.order = data.order;
        const highScore = this.points.length > 0 ? Math.max(...this.points) : [0];
        let numOfWinners = 0;
        if (!this.isTiebreak && this.points.length > 0) {
            for (const point of this.points) {
                numOfWinners += point === highScore ? 1 : 0;
            }
        }
        else {
            // TODO: Handle multiple tiebreak winners?
            numOfWinners = 1;
        }
        this.winner = this.order.slice(0, numOfWinners);
        this.completelyObjective = data.completelyObjective;
        this.location = Array.isArray(data.location) ? data.location : [data.location];
        this.isCompletedInStudio = data.isCompletedInStudio ?? false;
    }
    getTaskUploadPayload = () => {
        return {
            Name: this.name,
            Episode: this.episode,
            Series: this.series,
            NumOfParticipants: this.numOfParticipants,
            TotalPoints: this.totalPoints,
            Participants: this.participants.map(x => x.fullName),
            Categories: this.categories,
            HasSecret: this.hasSecret,
            IsTeamTask: this.isTeamTask,
            IsLiveTask: this.isLiveTask,
            IsPrizeTask: this.isPrizeTask,
            Winner: this.winner.map(x => x.fullName),
            isTiebreak: this.isTiebreak,
            IsVisualEditing: this.isVisualEditing,
            ContestantUsesVisualEditing: this.contestantsUsingVisualEditing && this.contestantsUsingVisualEditing.length > 0 ? this.contestantsUsingVisualEditing : null,
            Location: this.location,
            CompletelyObjective: this.completelyObjective
        };
    };
    getTaskScoringUploadPayload = (id) => {
        const map = {
            '15': [],
            '12': [],
            '7': [],
            '6': [],
            '5': [],
            '4': [],
            '3': [],
            '2': [],
            '1': [],
            '0': [],
            'Disqualified': []
        };
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i] !== undefined) {
                map[this.points[i].toString()].push(this.order[i]);
            }
            else {
                map.Disqualified.push(this.order[i]);
            }
        }
        let newMap = {
            '15': null,
            '12': null,
            '7': null,
            '6': null,
            '5': null,
            '4': null,
            '3': null,
            '2': null,
            '1': null,
            '0': null,
            'Disqualified': null,
            'Tiebreak Win': null,
            'Tiebreak Loss': null,
        };
        if (this.isTiebreak) {
            newMap['Tiebreak Win'] = [this.order[0].fullName];
            newMap['Tiebreak Loss'] = [this.order[1].fullName];
        }
        else {
            for (const [key, value] of Object.entries(map)) {
                newMap[key] = value.length > 0 ? value.map(x => x.fullName) : null;
            }
        }
        return {
            task: id,
            'Total Points': this.totalPoints,
            ...newMap
        };
    };
}
exports.Task = Task;
