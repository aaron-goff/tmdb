"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = void 0;
class Series {
    name;
    left;
    middleLeft;
    middle;
    middleRight;
    right;
    episodes;
    network;
    constructor(data) {
        this.name = data.name;
        this.left = data.left;
        this.middleLeft = data.middleLeft;
        this.middle = data.middle;
        this.middleRight = data.middleRight;
        this.right = data.right;
        this.episodes = data.episodes;
        this.network = data.network;
    }
    getSeriesPayload = () => {
        return {
            Name: this.name,
            Left: this.left.fullName,
            'Middle-Left': this.middleLeft.fullName,
            Middle: this.middle.fullName,
            'Middle-Right': this.middleRight.fullName,
            Right: this.right.fullName,
            Episodes: this.episodes,
            Network: this.network
        };
    };
}
exports.Series = Series;
