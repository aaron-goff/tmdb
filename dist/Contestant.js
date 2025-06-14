"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contestant = void 0;
const Enums_1 = require("./Enums");
class Contestant {
    firstName;
    lastName;
    fullName;
    series;
    placeOfBirth;
    nationality;
    placeOfBusiness;
    age;
    constructor(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.fullName = `${this.firstName} ${this.lastName}`;
        this.series = Array.isArray(data.series) ? data.series : [data.series];
        this.placeOfBirth = data.placeOfBirth ?? Enums_1.Country.England;
        this.nationality = data.nationality ?? Enums_1.Country.UK;
        this.placeOfBusiness = data.placeOfBusiness ?? Enums_1.Country.UK;
        this.age = Array.isArray(data.age) ? data.age : [data.age];
    }
    getContestantUploadData = () => {
        return {
            'First Name': this.firstName,
            'Last Name': this.lastName,
            'Full Name': this.fullName,
            Series: this.series,
            'Place of Birth': this.placeOfBirth,
            Nationality: this.nationality,
            'Place of Business': this.placeOfBusiness,
            Age: this.age
        };
    };
}
exports.Contestant = Contestant;
