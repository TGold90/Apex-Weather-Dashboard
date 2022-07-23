
var searchBtn = $("#search-btn");
var cityInput = $("cityInput");
var cityText = ("#citytext");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var uvIndex = $("#uv");

var lon;
var lat;
var coord;
var city;
var APIKey = "cb222b8fc6b876ca425d882c9612884c";


function citySearch(){
    city = $(this).siblings("input").val().trim();
    cityInput = "";
    console.log(city);

    // var getCoords = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;

    // fetch(getCoords).then(function (response){
    //     return response.json()
    // }).then(function(data){
    // console.log(data)
    // });

    // var queryURL = "https://api.openweathermap.org/data/2.5/onecall?q=" + city + "&appid=" + APIKey;

    var getCity = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey +"&units=imperial";

    fetch(getCity).then(function (response){
        return response.json()
    }).then(function(data){
    console.log(data)

    // lon = data.coord.lon.val;
    // lat = data.coord.lon.val;
    coord = data.coord;
    console.log(coord);
    
    

    var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coord + "&exclude=minutely,hourly&appid=" + APIKey;

    fetch(oneCall).then(function (response){
        return response.json()
    }).then(function(data){
    console.log(data)});

    });


}

//function to append city weather data to html


searchBtn.click(citySearch)

//function to save to local storage

//for loop to 
