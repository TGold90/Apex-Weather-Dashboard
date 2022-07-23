
var searchBtn = $("#search-btn");
var cityInput = $("cityInput");
var cityText = $("#citytext");
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
    cityInput.value = ""; //ask Eric
    console.log(city);

    var getCity = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey +"&units=imperial";

    fetch(getCity).then(function (response){
        return response.json()
    }).then(function(data){
        console.log(data)

        coord = data.coord;
        lon = coord.lon;
        lat = coord.lat;
        // console.log(coord);
        // console.log(lon);
        // console.log(lat);
    

        var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey + "&units=imperial";

        fetch(oneCall).then(function (response){
            return response.json()
        }).then(function(fulldata){
        console.log(fulldata)

        //maybe put this in a separate function so i can eruse for card creation
        cityText.text(data.name);
        console.log(data.name);
        temp.text("Temp: " + data.main.temp +"° F");
        wind.text("Wind: " + data.wind.speed + " mph");
        humidity.text("Humidity: " + data.main.humidity + " %")
        uvIndex.text("UV Index: " + fulldata.current.uvi);

        });
    });
};

//function to append city weather data to html


searchBtn.click(citySearch)

//function to save to local storage

//for loop to 

