
//Empty Variable to pass the city search should hopefully work for both Weather and Brewery API at the same time
var city = "";


// ==================================
//Weather API
var weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?" //city="dallas";
var weatherKey = "fb5c4c3b9af04b90ba63cec252a9d051";

var goodWeather = [800, 801, 802, 803];

var yesNo;

$(document).ready(function () {
    //Get the Weather API
    // getWeather(city);
    // // Get The Brewery API
    // renderBreweries()

});

function getWeather() {

    $.ajax({
        method: "GET",
        url: weatherURL + "city=" + city + "&key=" + weatherKey
    }).then(function (res) {

        var high, description, icon, code;

        $(".forecast-container").empty();
        for (var i = 0; i < 7; i++) {
            var goodDay = false;
            var weatherContent;
            code = res.data[i].weather.code;
            high = Math.round((res.data[i].max_temp * (9 / 5)) + 32);
            description = res.data[i].weather.description;
            icon = res.data[i].weather.icon;

            // $("#forecast").empty()

            if (goodWeather.indexOf(code) != -1) {
                goodDay = true;
                yesNo = "Great Day For a Beer!";
                weatherContent = /*html*/ `
                    <div class="card text-center card-width padding25 rounderCorners">
                        <h3>${res.data[i].valid_date}</h3>
                        <p>Is today a good day for a beer?</p>
                        <h2 class="yes-no">${yesNo}</h2>
                        <div> 
                        <p>Conditions:<img
                             style="width:40px; display:inline;" src="https://www.weatherbit.io/static/img/icons/${icon}.png"> <span
                             class="dailyConditions">${description}</span></p> 
                         <p>Max Temp: <span class="dailyTemp">${high}</span> | Hunmidity: <span class="dailyHumid">35</span>
                        </p></div>
                        <button id="breweryBtn" class="button">View Local Breweries</button>
                 </div>
             `
            }
            else {
                yesNo = "Nahh";
                weatherContent = /*html*/ `
             <div class="card text-center card-width padding25 rounderCorners">
                     <h3>${res.data[i].valid_date}</h3>
                     <p>Is today a good day for a beer?</p>
                     <h2 class="yes-no">${yesNo}</h2>
                     <div> 
                     <p>Conditions:<img
                             style="width:40px; display:inline;" src="https://www.weatherbit.io/static/img/icons/${icon}.png"> <span
                             class="dailyConditions">${description}</span></p> 
                         <p>Max Temp: <span class="dailyTemp">${high}</span> | Hunmidity: <span class="dailyHumid">35</span>
                     </p></div>
                 </div>
             `
            }

            // Set HTML content to a variable

            // on Append we just simply name the variable above
            $("#forecast").append(weatherContent)

        }
        //function for the slick slider
        if ($("#forecast").hasClass("slick-initialized")) {
            console.log("If Running")
            // return
            $("#forecast").slick('unslick')
            console.log("unslick")
            $("#forecast").slick({
                lazyLoad: 'ondemand', // ondemand progressive anticipated
                infinite: true
            });
            console.log("Slick")
        } else {
            console.log("SLICK")
            $("#forecast").slick({
                lazyLoad: 'ondemand', // ondemand progressive anticipated
                infinite: true
            });
        }
    })
}



// ==================================
//Brewery List API

breweryQueryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city

var brewName, brewType, brewAddress, brewWebsite;

function renderBreweries() {
    $.ajax({
        method: "GET",
        url: breweryQueryURL
    }).then(function (response) {
        console.log(response);

        brewName = response[0].name;
        brewType = response[0].brewery_type;
        brewAddress = response[0].street;
        brewWebsite = response[0].website_url;

        console.log(brewName, brewType, brewAddress, brewWebsite);


        //for i = 0; i < response.length; i++ to get all the breweries

    })
}

$(".submit").on("click", function (event) {
    event.preventDefault();
    console.log("click")
    city = $("#input-search").val();
    getWeather()
})
