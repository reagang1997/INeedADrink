
//Empty Variable to pass the city search should hopefully work for both Weather and Brewery API at the same time
city = ""


// ==================================
//Weather API
var weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?" //city="dallas";
var weatherKey = "fb5c4c3b9af04b90ba63cec252a9d051";

$(document).ready(function () {
    //Get the Weather API
    getWeather();
    // Get The Brewery API
    renderBreweries()

});

function getWeather() {

    $.ajax({
        method: "GET",
        url: weatherURL + "city=dallas&key=" + weatherKey
    }).then(function (res) {
        console.log(res);
    })
}



// ==================================
//Brewery List API

breweryQueryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city

function renderBreweries() {
    $.ajax({
        method: "GET",
        url: breweryQueryURL
    }).then(function (response) {
        console.log(response);
    })
}

