
//Empty Variable to pass the city search should hopefully work for both Weather and Brewery API at the same time
var city = "";


//if there are city searches in local storage, then we pull them and set the drop down
// else we create the array
if (localStorage.getItem("citySearches")) {
    var citySearches = JSON.parse(localStorage.getItem("citySearches"));
    setDropdown();
}
else {
    var citySearches = [];
}

// if favBrews is in local storage, then we pull it and save it, else create it
if (localStorage.getItem("favBrews")) {
    var favBrews = JSON.parse(localStorage.getItem("favBrews"));
}
else {
    var favBrews = [];
}


// ==================================
//Weather API
var weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
var weatherKey = "fb5c4c3b9af04b90ba63cec252a9d051";

// Weather codes that classify as "good weather"
var goodWeather = [800, 801, 802, 803];


$(document).ready(function () {
    // when loaded, initialize the dropdown
    initDropdown();

});

// function to get all info from weather API
function getWeather() {

    $.ajax({
        method: "GET",
        url: weatherURL + "city=" + city + "&key=" + weatherKey
    }).then(function (res) {

        //set varaiables
        var high, description, icon, code;

        var cityResponse = res.city_name

        // var currentSlide = $(".slick-slide").slick('slickCurrentSlide')

        // $(".forecast-container").empty();
        // $("#forecast").empty();


        // for (var i = 0; i <= 7; i++) {
        //     $(".slick-slide").slick('slickRemove', currentSlide);
        //     console.log("remove");
        // }
        //generateing a 7-day forecast

        // if ($("#forecast").hasClass("slick-initialized")) {
        //     for (var i = 0; i <= 7; i++) {
        //         $(".slick-track").slick('slickRemove', $("#dynamic-slide")[i]);
        //         console.log("remove" + i);
        //     }
        // }
        for (var i = 0; i <= 7; i++) {
            var goodDay = false;
            var weatherContent;
            code = res.data[i].weather.code;
            high = Math.round((res.data[i].max_temp * (9 / 5)) + 32);
            description = res.data[i].weather.description;
            icon = res.data[i].weather.icon;
            wind = res.data[i].wind_spd;
            windspeed = Math.round(wind);

            var slideContainer = $('#dynamic-slide')

            if (slideContainer == true) {
                // $('#dynamic-slide').remove();
                $("#dynamic-slide").slick('slickRemove', i)
                console.log("Removed " + i)
            }

            // if the current weather code is in our array, then its a good day for a beer!            
            if (goodWeather.indexOf(code) != -1) {
                goodDay = true;
                //  Adding variables for date so we can reformat it
                var responseDate = res.data[i].valid_date;
                //monthDay grabs only the month and the day from response
                var monthDay = responseDate.substr(5)
                // year grabs only the year
                var year = responseDate.substr(0, 4)
                // final date combine both with a dash in between the day and year
                var finalDate = monthDay + "-" + year

                var imageGood = /*html*/ `<img src="assets/images/sunny-icon.svg" alt="Great Day Icon">
                `
                // create forecast card for a good day
                weatherContent = /*html*/ `
                <div id ="dynamic-slide" class="card good-day rounderCorners pos-relative">
                    <p class="text-right pos-absolute date">${finalDate} <br> ${cityResponse}</p>
                    <div class="grid-x padding25">
                        <div id="icon" class="cell medium-2 padding25">${imageGood}</div>
                        <div id="day-status" class=" cell medium-7">
                          <h2>Today is a Great Day For A Beer!</h2>
                        </div>
                    </div>
                    <div class="condition-info-good padding-y-15">
                         <div class="grid-x">
                             <div id="conditions" class="cell medium-8 margin-0">
                                  <ul>
                                        <li>
                                          <p><b>High:</b> ${high}°</p>
                                      </li>
                                      <li>
                                         <p><b>Conditions:</b> <img
                                         style="width:40px; display:inline;" src="https://www.weatherbit.io/static/img/icons/${icon}.png"> ${description}</p>
                                     </li>
                                     <li>
                                        <p><b>Wind Speed:</b> ${windspeed} </p>
                                      </li>
                                    </ul>
                                </div>
                                <div id="view-breweries" class="cell medium-4 text-right">
                                 <button id="breweryBtn" class="button rounderCorners margin-0 view-breweries">View Local
                                   Breweries</button>
                                </div>
                        </div>
                 </div>
             </div>
             `
            }
            else {
                //  Adding variables for date so we can reformat it
                var responseDate = res.data[i].valid_date;
                //monthDay grabs only the month and the day from response
                var monthDay = responseDate.substr(5)
                // year grabs only the year
                var year = responseDate.substr(0, 4)
                // final date combine both with a dash in between the day and year
                var finalDate = monthDay + "-" + year
                var imageBad = /*html*/ `<img src="assets/images/stormy-icon.svg" alt="Bad Day Icon">
                `
                //create forecast card for a bad day
                weatherContent = /*html*/ `
                <div id ="dynamic-slide" class="card bad-day rounderCorners pos-relative">
                    <p class="text-right pos-absolute date">${finalDate} <br> ${cityResponse}</p>
                        <div class="grid-x padding25">
                            <div id="icon" class="cell medium-2 padding25">${imageBad}</div>
                            <div id="day-status" class="cell medium-7">
                            <h2>Today is NOT a Great Day For A Beer...</h2>
                            </div>
                        </div>
                    <div class="condition-info-bad padding-y-15">
                     <div class="grid-x">
                          <div id="conditions" class="cell margin-0">
                                <ul>
                                    <li>
                                      <p><b>High:</b> ${high}°</p>
                                    </li>
                                    <li>
                                     <p><b>Conditions:</b> <img
                                     style="width:40px; display:inline;" src="https://www.weatherbit.io/static/img/icons/${icon}.png"> ${description}</p>
                                    </li>
                                    <li>
                                    <p><b>Wind Speed:</b> ${windspeed}</p>
                                    </li>
                                </ul>
                            </div>
                     </div>
                    </div>
            </div>
             `
            }
            // if ($("#forecast").hasClass("slick-initialized")) {
            //     $(".slick-track").slick('slickRemove', $("#dynamic-slide")[i]);

            //     console.log("Slide Removed " + i)
            // }
            // on Append we just simply name the variable above
            $("#forecast").append(weatherContent)

        }
        //function for the slick slider
        // if the slider has already been initialized, we have to "un-initialize" and then reinitialize 
        if ($("#forecast").hasClass("slick-initialized")) {
            // return
            $("#forecast").slick('unslick')
            $("#forecast").slick({
                lazyLoad: 'ondemand', // ondemand progressive anticipated
                infinite: true
            });
        } else {
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

// function to retrieve brewery info, and render it
function renderBreweries() {
    breweryQueryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city
    $.ajax({
        method: "GET",
        url: breweryQueryURL
    }).then(function (response) {
        console.log(response);

        // button to go back to the forecast
        $("#brewery-container").append(/*html*/ `
        <div class="fore-btn-wrap marginT-20">
        <button id="backToForecast" class="button rounderCorners">
            Back to Forecast
        </button></div>
        `)

        //render all the breweries from the resposne
        for (var i = 0; i < response.length; i++) {
            brewName = response[i].name;
            brewType = response[i].brewery_type;
            brewAddress = response[i].street;
            brewWebsite = response[i].website_url;
            //logic for skipping planning
            if (brewType === "planning") {
                continue;
            }
            // if the brewery has been favorited, make sure the heart is still red
            if (favBrews.indexOf(brewName) != -1) {
                $("#brewery-container").append(/*html*/ `
                <div class="card margin5 rounderCorners pos-relative">
                <div id="favorite" class="pos-absolute fav-icon-pos"> <i id="heart" class="fas fa-heart"></i></div>
                <h4 class="brewName">${brewName}</h4>
                <p>Type: <span class="brewType">${brewType}<br>
                    Address: ${brewAddress}<br>
                    <a href="${brewWebsite}" target="blank">${brewWebsite}</a>
                </p>
            </div>
            `)
            }
            // else the heart will be blank
            else {
                $("#brewery-container").append(/*html*/ `
                <div class="card margin5 rounderCorners pos-relative">
                    <div id="favorite" class="pos-absolute fav-icon-pos"> <i id="heart" class="far fa-heart"></i></div>
                    <h4 class="brewName">${brewName}</h4>
                    <p>Type: <span class="brewType">${brewType}<br>
                        Address: ${brewAddress}<br>
                        <a href="${brewWebsite}" target="blank">${brewWebsite}</a>
                    </p>
                </div>
                `)
            }

        }

    })
}

// event handler for clicking subit on city search
$(".submit").on("click", function (event) {
    event.preventDefault();
    city = $("#input-search").val();
    // if this city has NOT been searched, save it
    if (citySearches.indexOf(city) === -1) {
        citySearches.push(city);
        localStorage.setItem("citySearches", JSON.stringify(citySearches));
        setDropdown(city);
    }
    // hide the instructions and who the forecast
    $("#intructions").addClass("hide");
    $("#forecast").removeClass("hide");
    // empty the input search field, get weather, and empty the brewery container
    $("#input-search").val("");
    getWeather()

    $("#brewery-container").empty();
})

// when "show local breweries" will render breweries and hide forecast containers
$("#forecast").on("click", "#breweryBtn", function (event) {
    event.preventDefault();
    //added function to empty the brewery container on clicking the view brewery buttons
    $("#brewery-container").empty();
    $("#forecast").addClass("hide");
    $(".fore-btn-wrap").removeClass("hide");
    $("#breweries").removeClass("hide");

    renderBreweries();
})

//removed back to forecast click event and included the new button in the brewery container click event
$("#brewery-container").on("click", "#backToForecast", function (event) {
    event.preventDefault();
    $("#breweries").addClass("hide");
    $(".fore-btn-wrap").addClass("hide");
    $("#forecast").removeClass("hide");
})

// event listener for clicking the heart
$("#brewery-container").on("click", "#heart", function (event) {

    var tmp = this.parentElement.nextElementSibling.textContent;

    // change the color of the heart
    $(this).removeClass("far")
        .addClass("fas");

    // push it into storage
    if (favBrews.indexOf(tmp) === -1) {
        favBrews.push(tmp);
        localStorage.setItem("favBrews", JSON.stringify(favBrews));
    }

})

function setDropdown(city) {
    $("#input-drop").append($("<option>").text(city));
}


function initDropdown() {
    $.each(citySearches, function (i, city) {
        $("#input-drop").append($("<option>").text(city));
    })
}