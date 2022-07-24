
var searchBtn = $("#search-btn");
var cityInput = $("#cityInput");
var cityText = $("#citytext");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var uvIndex = $("#uv");

var lon;
var lat;
var coord;
var city;
var location;
// var state;
// var country;
var APIKey = "cb222b8fc6b876ca425d882c9612884c";
var storedCity = JSON.parse(localStorage.getItem("storedCity")) || [];


function citySearch(){
    $("#forecast-div").empty();

if ($(this).attr("id") === "search-btn"){
    city = $(this).siblings("input").val().trim();
    storedCity.push(city);
    localStorage.setItem("storedCity", JSON.stringify(storedCity));
    cityInput.val(""); 
}   else {
    city = $(this).text();
}

    
    console.log(city);

    // var getCity = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey +"&units=imperial";

    var geoLoc = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;

    // "https://api.openweathermap.org/data/2.5/weather?q=:" + location + "&appid="{API key" incl state/country

    fetch(geoLoc).then(function (response){
        return response.json()
    }).then(function(data){
        console.log(data)

        coord = data[0];
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

        //maybe put this in a separate function so i can reuse for card creation
        let uvIndexNum = fulldata.current.uvi;

        cityText.text(data[0].name);
        
        temp.text("Temp: " + fulldata.current.temp +"° F");
        wind.text("Wind: " + fulldata.current.wind_speed + " mph");
        humidity.text("Humidity: " + fulldata.current.humidity + " %");
        uvIndex.text("UV Index: " + uvIndexNum);

        if (uvIndexNum >= 7){
            uvIndex.addClass("severe");
        } else if (uvIndexNum < 7 && uvIndex >= 4){
            uvIndex.removeClass("severe");
            uvIndex.addClass("moderate");
        } else{
            uvIndex.removeClass("moderate");
            uvIndex.addClass("favorable");
        }

        renderFiveDay(fulldata.daily);
        renderBtn();

        });
    });
};

function renderFiveDay(fiveDay){
    for (let i=1; i < 6; i++){
        var card = $("<div>");
        card.addClass("card text-left")
        var img = $("<img>");
        img.addClass("card-img-top");
        img.attr("src", "http://openweathermap.org/img/wn/" + fiveDay[i].weather[0].icon + "@2x.png"); //add same thing to current weather 
        var cardBody = $("<div>");
        var cardTitle = $("<h4>");
        var temp = $("<p>");
        var wind = $("<p>");
        var humidity = $("<p>");
        cardBody.addClass("card-body");
        cardTitle.addClass("card-title");
        temp.addClass("card-text");
        wind.addClass("card-text");
        humidity.addClass("card-text");

        cardTitle.text(moment.unix(fiveDay[i].dt).format("MM/DD/YYYY"));
        temp.text("temp: " + fiveDay[i].temp.max);
        wind.text("temp: " + fiveDay[i].wind_speed);
        humidity.text("temp: " + fiveDay[i].humidity);

        card.append(img, cardBody, cardTitle, temp, wind, humidity);
        $("#forecast-div").append(card);
    }
    
}

function renderBtn (){
    $("#button-div").empty();
    for (let i = 0; i < storedCity.length; i++){
        var btn = $("<button>")
        btn.addClass("btn text-light")
        btn.text(storedCity[i]);
        $("#button-div").append(btn);
    }
    
}

renderBtn()
$("#button-div").on("click", "button", citySearch)
searchBtn.click(citySearch)

//function to save to local storage

//for loop to gen cards

