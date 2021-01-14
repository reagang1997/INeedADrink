
//Empty Variable to pass the city search should hopefully work for both Weather and Brewery API at the same time
city = ""


// ==================================
//Weather API
var weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?" //city="dallas";
var weatherKey = "fb5c4c3b9af04b90ba63cec252a9d051";

var goodWeather = [800, 801, 802, 803];

var yesNo;

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

        var high, description, icon, code;

        $(".forecast-container").empty();
        for (var i = 0; i < 7; i++) {
            var goodDay = false;

            code = res.data[i].weather.code;
            high = Math.round((res.data[i].max_temp * (9 / 5)) + 32);
            description = res.data[i].weather.description;
            icon = res.data[i].weather.icon;

            if (goodWeather.indexOf(code) != -1) {
                goodDay = true;
                yesNo = "Great Day For a Beer!";
            }
            else {
                yesNo = "Nahh";
            }

            if(goodDay){
                $(".forecast-container").append(/*html*/ `
                <div class="day-card">
        
                    <p><span class="date">${res.data[i].valid_date}</span></p>
                    <p>Good Day For a Beer?</p>
    
                    <p><span class="yes-no">${yesNo}</span></p>
    
                    <img src="https://www.weatherbit.io/static/img/icons/${icon}.png">
    
                    <p><span class="temp">${high}</span>&degF</p>
    
                    <p>Conditions: <span class="conditions">${description}</span></p>
    
                    <button class="local-brew">Find Me Local Breweries!</button>
    
                </div>
                `)
            }
            else{
                $(".forecast-container").append(/*html*/ `
                <div class="day-card">
        
                    <p><span class="date">${res.data[i].valid_date}</span></p>
                    <p>Good Day For a Beer?</p>
    
                    <p><span class="yes-no">${yesNo}</span></p>
    
                    <img src="https://www.weatherbit.io/static/img/icons/${icon}.png">
    
                    <p><span class="temp">${high}</span>&degF</p>
    
                    <p>Conditions: <span class="conditions">${description}</span></p>
    
    
                </div>
                `)
            }
           
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

