var weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?" //city="dallas";
var weatherKey = "fb5c4c3b9af04b90ba63cec252a9d051";


$(document).ready(function(){
   
    getWeather();
    console.log(icon);
});

function getWeather(){

    $.ajax({
        method: "GET",
        url: weatherURL + "city=dallas&key=" + weatherKey
    }).then(function(res){
        console.log(res);
        
    })
}