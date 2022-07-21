
var searchBtn = $("#search-btn");
var cityInput = $("cityInput");

var city;
var APIKey = "cb222b8fc6b876ca425d882c9612884c";
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey; //&units=standard add this later when we know if works

// "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=cb222b8fc6b876ca425d882c9612884c" this works

function citySearch(){
    city = $(this).siblings("input").val().trim();
    cityInput = "";
    console.log(city);

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL).then(function (response){
        return response.json()
    }).then(function(data){
    console.log(data)
    });
}

searchBtn.click(citySearch)


