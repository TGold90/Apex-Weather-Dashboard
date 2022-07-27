
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

var APIKey = "cb222b8fc6b876ca425d882c9612884c";
var storedCity = JSON.parse(localStorage.getItem("storedCity")) || [];


function citySearch(){
    $("#forecast-div").empty();
    $("#cityIcon").empty();

if ($(this).attr("id") === "search-btn"){
    city = $(this).siblings("input").val().trim();
    storedCity.push(city);
    localStorage.setItem("storedCity", JSON.stringify(storedCity));
    cityInput.val(""); 
}   else {
    city = $(this).text();
}

    var geoLoc = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;

    fetch(geoLoc).then(function (response){
        return response.json()
    }).then(function(data){

        coord = data[0];
        lon = coord.lon;
        lat = coord.lat;

        var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey + "&units=imperial";

        fetch(oneCall).then(function (response){
            return response.json()
        }).then(function(fulldata){
        console.log(fulldata)

        let uvIndexNum = fulldata.current.uvi;
        let icon = $("<img>");
        cityText.text(data[0].name);
        
        temp.text("Temp: " + fulldata.current.temp +"° F");
        wind.text("Wind: " + fulldata.current.wind_speed + " mph");
        humidity.text("Humidity: " + fulldata.current.humidity + " %");
        uvIndex.text("UV Index: " + uvIndexNum);
        icon.attr("src", "http://openweathermap.org/img/wn/" + fulldata.daily[0].weather[0].icon + "@2x.png");
        icon.addClass("icon");
        $("#cityIcon").append(icon);
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
        card.addClass("card text-left px-1")
        var img = $("<img>");
        img.addClass("card-img-top");
        img.attr("src", "http://openweathermap.org/img/wn/" + fiveDay[i].weather[0].icon + "@2x.png");
        var cardBody = $("<div>");
        var cardTitle = $("<h4>");
        var temp = $("<p>");
        var low = $("<p>");
        var wind = $("<p>");
        var humidity = $("<p>");
        cardBody.addClass("card-body");
        cardTitle.addClass("card-title");
        temp.addClass("card-text");
        low.addClass("card-text");
        wind.addClass("card-text");
        humidity.addClass("card-text");

        cardTitle.text(moment.unix(fiveDay[i].dt).format("MM/DD/YYYY"));
        temp.text("High: " + fiveDay[i].temp.max + "° F");
        low.text("Low: " + fiveDay[i].temp.min + "° F");
        wind.text("Wind: " + fiveDay[i].wind_speed + "mph");
        humidity.text("Humidity: " + fiveDay[i].humidity + "%");

        card.append(img, cardBody, cardTitle, temp, low, wind, humidity);
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
