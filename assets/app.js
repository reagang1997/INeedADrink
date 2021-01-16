
//Empty Variable to pass the city search should hopefully work for both Weather and Brewery API at the same time
var city = "";


// ==================================
//Weather API
var weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?" //city="dallas";
var weatherKey = "fb5c4c3b9af04b90ba63cec252a9d051";

var goodWeather = [800, 801, 802, 803];

// var yesNo;

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
        console.log(res)
        var high, description, icon, code;

        $(".forecast-container").empty();
        for (var i = 0; i <= 7; i++) {
            var goodDay = false;
            var weatherContent;
            code = res.data[i].weather.code;
            high = Math.round((res.data[i].max_temp * (9 / 5)) + 32);
            description = res.data[i].weather.description;
            icon = res.data[i].weather.icon;

            // $("#forecast").empty()

            if (goodWeather.indexOf(code) != -1) {
                goodDay = true;
                // yesNo = "Great Day For a Beer!";
                // yesNo = "Great Day For a Beer!";
                //  Adding variables for date so we can reformat it
                var responseDate = res.data[i].valid_date;
                //monthDay grabs only the month and the day from response
                var monthDay = responseDate.substr(5)
                // year grabs only the year
                var year = responseDate.substr(0, 4)
                // final date combine both with a dash in between the day and year
                var finalDate = monthDay + "-" + year
                console.log(finalDate)

                var imageGood = /*html*/ `<img src="assets/images/great-day.svg" style="display:inline;" alt="Great Day!">
                `
                weatherContent = /*html*/ `
                    <div class="card text-center card-width padding25 rounderCorners">
                    
                    <h4>${finalDate}</h4>
                       
                    <div class="marginT-20">${imageGood}</div>
                    <div> 
                        <p>Max Temp: <span class="dailyTemp">${high}</span>  |  Conditions:<img
                             style="width:40px; display:inline;" src="https://www.weatherbit.io/static/img/icons/${icon}.png"> <span
                             class="dailyConditions">${description}</span>
                           |  Humidity: <span class="dailyHumid">35</span>
                        </p></div>
                        <button id="breweryBtn" class="button rounderCorners">View Local Breweries</button>
                 </div>
             `
            }
            else {
                // yesNo = "Nahh";
                // yesNo = "Great Day For a Beer!";
                var imageBad = /*html*/ `<img src="assets/images/bad-day.svg" style="display:inline;" alt="Great Day!">
                `
                weatherContent = /*html*/ `
             <div class="card text-center card-width padding25 rounderCorners">
                     <h4>${finalDate}</h4>
                     <div class="marginT-20">${imageBad}</div>
                    <div> 
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



var brewName, brewType, brewAddress, brewWebsite;

function renderBreweries() {
    breweryQueryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city
    $.ajax({
        method: "GET",
        url: breweryQueryURL
    }).then(function (response) {
        console.log(response);


        console.log(brewName, brewType, brewAddress, brewWebsite);

        for (var i = 0; i < response.length; i++) {

            brewName = response[i].name;
            brewType = response[i].brewery_type;
            brewAddress = response[i].street;
            brewWebsite = response[i].website_url;
            $("#breweries").append(/*html*/ `
            <div class="brewery padding25 rounderCorners" >
            <h4 class="brewName">${brewName}</h4>
            <p>Type: <span class="brewType">${brewType}</span></p>
            <p>Address: ${brewAddress}</p>
            <a href="${brewWebsite}">${brewWebsite}</a>
        </div>
            `)
        }

    })
}

$(".submit").on("click", function (event) {
    event.preventDefault();
    console.log("click")
    city = $("#input-search").val();
    getWeather()
})

$("#forecast").on("click", "#breweryBtn", function (event) {
    event.preventDefault();
    city = $("#input-search").val();
    renderBreweries();
})
