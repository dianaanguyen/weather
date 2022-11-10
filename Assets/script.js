var searchBtn = $(".searchBtn");
var inputForm = $(".inputForm");
var citySpan = $(".citySpan");
var dateSpan = $(".dateSpan");
var tempSpan = $(".tempSpan");
var humiditySpan = $(".humiditySpan");
var windSpan = $(".windSpan");
var uvSpan = $(".uvSpan");
var day1 = $(".day1"); // targets day 1
var day1Icon = $(".day1Icon");
var day1Temp = $(".day1Temp");
var day1Humidity = $(".day1Humidity");
var day2 = $(".day2"); // targets day 2
var day2Icon = $(".day2Icon");
var day2Temp = $(".day2Temp");
var day2Humidity = $(".day2Humidity");
var day3 = $(".day3"); // targets day 3
var day3Icon = $(".day3Icon");
var day3Temp = $(".day3Temp");
var day3Humidity = $(".day3Humidity");
var day4 = $(".day4"); // targets day 4
var day4Icon = $(".day4Icon");
var day4Temp = $(".day4Temp");
var day2Humidity = $(".day2Humidity");
var day5 = $(".day2"); // targets day 5
var day5Icon = $(".day5Icon");
var day5Temp = $(".day5Temp");
var day5Humidity = $(".day5Humidity");
var welcomeText = $(".welcomeText");
var containerBlock = $(".containerBlock");
var card = $(".card");
var historyList = $(".historyList")

$(document ).ready(function() {
    containerBlock.hide();
    card.hide();
});

function getUserInput(event) {
    event.preventDefault();
    console.log("Button clicked works");
    var userInput = inputForm.val().trim();
    inputForm.val(""); //clears input form

    if (userInput) {
        console.log(userInput);
        var cityUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=8b92ec0643e6c212528ff70aac22592f";
        appendItems(cityUrl);
    } else {
        alert("Please enter in a city");
    };
};

function appendItems(cityUrl) {
    console.log(cityUrl);
    fetch(cityUrl)
        .then(function(response) {
            if (response.ok) {
                console.log("Fetch response worked");
                return response.json();
            } else {
                alert("Please enter a valid city name.");
            }
        })
        .then(function(data) {
            console.log(data);
            welcomeText.hide(1000);
            containerBlock.show(2000);
            card.show();
            var cityName = data.city.name;
            var country = data.city.country;
            var date = moment.unix(data.list[0].dt).format("MMMM YY");
            var temp = data.list[0].main.temp;
            var humidity = data.list[0].main.humidity;
            var wind = data.list[0].main.wind.speed;
            citySpan.text(`${cityName}, ${country}`);
            dateSpan.text(date);
            tempSpan.text(temp);
            humiditySpan.text(humidity);
            windSpan.text(wind);
        })
}