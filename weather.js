//Trevor Withers
//Creates objects and stores them in an array
let kingston = {
    city: "Kingston",
    sunday: ["rainy", 13],
    monday: ["cloudy", 12],
    tuesday: ["cloudy", 14],
    wednesday: ["sunny", 16],
    thursday: ["rainy", 14],
    friday: ["rainy", 10],
    saturday: ["sunny", 11]
};

let toronto = {
    city: "Toronto",
    sunday: ["cloudy", 14],
    monday: ["cloudy", 13],
    tuesday: ["sunny", 16],
    wednesday: ["sunny", 18],
    thursday: ["rainy", 15],
    friday: ["cloudy", 11],
    saturday: ["cloudy", 11]
};

let ottawa = {
    city: "Ottawa",
    sunday: ["cloudy", 11],
    monday: ["cloudy", 10],
    tuesday: ["sunny", 15],
    wednesday: ["sunny", 17],
    thursday: ["cloudy", 16],
    friday: ["rainy", 11],
    saturday: ["sunny", 10]
};

let weekly = [
    kingston,
    ottawa,
    toronto
];

//Exports the weekly array for use in other files
module.exports =
{
    weekly: weekly
}