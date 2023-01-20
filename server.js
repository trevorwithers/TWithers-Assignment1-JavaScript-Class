//Trevor Withers
const express = require("express");
const weather = require("./weather.js");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.listen(3000);

//Creates a master array filled with weather data
let allWeatherDataArray = [];
fillArray();

//Displays weather data for all 3 locations
app.get("/weather", (request, response) =>{
    response.render("weather1", { weekday: allWeatherDataArray, pageStage: 0});
});

//Displays weather data for a specific city
app.get("/weather/:city", (request, response)=>{
    let passedCity = request.params.city.toLowerCase();
    let index = findIndex(passedCity, 3, "city");
    response.render("weather1", {weekday: allWeatherDataArray, pageStage: 1, index: index});
});

//Displays weather data for a specific city and day
app.get("/weather/:city/:day", (request, response)=>{
    let passedCity = request.params.city.toLowerCase();
    let passedDay = request.params.day.toLowerCase();
    let index = findIndex(passedCity, 3, "city");
    let dayIndex = findIndex(passedDay, 8, "day");
    let dayCityWeather = "";
    dayCityWeather = allWeatherDataArray[0][dayIndex][0];
    passedDay = passedDay.charAt(0).toUpperCase() + passedDay.slice(1);
    response.render("weather1", {weekday: allWeatherDataArray, pageStage: 2, passedDay: passedDay, dayCityWeather: dayCityWeather, index: index, dayIndex:dayIndex});
});

//Displays the warmest city based on a given day
app.get("/warmest/day/:day", (request, response)=>{
    let passedDay = request.params.day.toLowerCase();
    let index = findIndex(passedDay, 8, "day");
    let cityIndex = findWarmestDay(index);
    let warmestCityDay = allWeatherDataArray[cityIndex][index][0].charAt(0).toUpperCase() + allWeatherDataArray[cityIndex][index][0].slice(1);
    response.render("weather1", {pageStage: 3, warmestCityName: allWeatherDataArray[cityIndex][0][1], warmestCityDay: warmestCityDay, warmestCityTemp: allWeatherDataArray[cityIndex][index][1][1]});
});

//Displays the warmest day based on a given city
app.get("/warmest/city/:city", (request, response)=>{
    let passedCity = request.params.city.toLowerCase();
    let index = findIndex(passedCity, 3, "city");
    let tempIndex = findWarmestCityDay(index);
    response.render("weather1", {pageStage: 4, passedCity: allWeatherDataArray, tempIndex: tempIndex, index: index});
});

//Displays the average temperature of each location
app.get("/average", (request, response)=>{
    response.render("weather1", {cityAvgs: findAverage(), pageStage: 5});
});

//Displays all of the sunny days for a given city
app.get("/sunny/:city", (request, response)=>{
    let passedCity = request.params.city.toLowerCase();
    let index = findIndex(passedCity, 3, "city");
    passedCity = passedCity.charAt(0).toUpperCase() + passedCity.slice(1);
    response.render("weather1", {pageStage: 6, passedCity: passedCity, sunnyDays: findSunny(index), weekDays: allWeatherDataArray[index]});
});

//Finds and returns the index of the warmest city for a given day
function findWarmestDay(index)
{
    let warmestDayIndex = 0;
    let warmestDayTemp = 0;
    for (let i = 0; i < allWeatherDataArray.length; i++)
    {
        for (let x = 0; x < allWeatherDataArray[i].length; x++)
        {
            if (allWeatherDataArray[i][x][1][1] > warmestDayTemp)
            {
                warmestDayTemp = allWeatherDataArray[i][x][1][1];
                warmestDayIndex = i;
            }
        }
    }
    return warmestDayIndex;
}

//Finds and returns index of the warmest day based on a given city
function findWarmestCityDay(index)
{
    let warmestDayIndex = 0;
    let warmestDayTemp = 0;
    for(let i = 1; i < allWeatherDataArray[index].length; i++)
    {
        if(allWeatherDataArray[index][i][1][1] > warmestDayTemp)
        {
            warmestDayTemp = allWeatherDataArray[index][i][1][1];
            warmestDayIndex = i;
        }
    }

    return warmestDayIndex;
}

//Creates and returns an array containing the average temperature for each city
function findAverage()
{
    let avg = 0;
    let cityAvgs = []
    for (let i = 0; i < allWeatherDataArray.length; i++)
    {
        let allTemps = [];
        for (let x = 1; x < allWeatherDataArray[i].length; x++)
        {
            allTemps.push(allWeatherDataArray[i][x][1][1]);
        }
        for (let i = 0; i < allTemps.length; i++)
        {
            avg += allTemps[i];
        }
        avg /= allTemps.length;
        cityAvgs.push(avg.toFixed(2));
    }
    return cityAvgs;
}

//Finds and returns each sunny day for a given city
function findSunny(index)
{
    let sunnyDayIndex = [];
    for (let i = 1; i < 8; i++)
    {
        if (allWeatherDataArray[index][i][1][0] == "sunny")
        {
            sunnyDayIndex.push(i);
        }
    }
    return sunnyDayIndex;
}

//Finds the index of either a city or a day based on passed parameters
function findIndex(pParam, length, type)
{
    let index = 0;
    for (let i = 0; i < length; i++)
    {
        if (type == "city" && allWeatherDataArray[i][0][1].toLowerCase() == pParam|| type == "day" && allWeatherDataArray[0][i][0].toLowerCase() == pParam)
        {
            index = i;
        }
    }
    return index;
}

//Fills the allWeatherDataArray
function fillArray()
{
    let cityWeatherData = [];
    for (let i = 0; i < weather.weekly.length; i++)
    {
        cityWeatherData = Object.entries(weather.weekly[i]);

        allWeatherDataArray.push(cityWeatherData);
    }
}