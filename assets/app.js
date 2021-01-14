
//Empty Variable to pass the city search should hopefully work for both Weather and Brewery API at the same time
city = ""


// ==================================
//Weather API
var weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?" //city="dallas";
var weatherKey = "fb5c4c3b9af04b90ba63cec252a9d051";

var goodWeather = [800, 801, 802, 803];
var goodDay = false;

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

        var high, description, icon, code;
        
        high = Math.round((res.data[0].max_temp * (9/5)) + 32);
        description = res.data[0].weather.description;
        icon = res.data[0].weather.icon;
        code = res.data[0].weather.code;
        if(goodWeather.indexOf(code) != -1){
            goodDay = true;
        }
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

