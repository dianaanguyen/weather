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
var day5 = $(".day5"); // targets day 5
var day5Icon = $(".day5Icon");
var day5Temp = $(".day5Temp");
var day5Humidity = $(".day5Humidity");
var welcomeText = $(".welcomeText");
var containerBlock = $(".containerBlock");
var card = $(".card");
var historyList = $(".history-list")

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
        var cityUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=8b92ec0643e6c212528ff70aac22592f";
        appendItems(cityUrl);
        // getCityCoordinates(userInput)
    } else {
        alert("Please enter in a city");
    };
};

// function getCityCoordinates(city) {
//         var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+APIKey;
//         fetch(cityUrl)
//         .then(function(data) {
//             return data.json()
//         }) 
//         .then(function(data){
//             console.log(data)
//             var lat = data[0].lat
//             var lon = data[0].lon
//             appendItems(lat,lon)
//         })
// }


function appendItems(cityUrl) {
    console.log(cityUrl);
    fetch(cityUrl)
    // var URL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid="+APIKey
    // fetch(URL)
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
            var wind = data.list[0].wind.speed;
            citySpan.text(`${cityName}, ${country}`);
            dateSpan.text(date);
            tempSpan.text(temp);
            humiditySpan.text(humidity);
            windSpan.text(wind);

            var icon1 = data.list[0].weather[0].icon; //Day 1 Forecast
            var iconUrl1 = "https://openweathermap.org/img/w/" + icon1 + ".png";
            day1.text("TODAY");
            day1Icon.attr("src", iconUrl1);
            day1Temp.text(temp);

            var icon2 = data.list[8].weather[0].icon; // Day 2 Forecast
            var iconUrl2 = "https://openweathermap.org/img/w/" + icon2 + ".png";
            var date2 = moment.unix(data.list[8].dt).format("dddd");
            day2.text(date2);
            day2Icon.attr("src", iconUrl2);
            var date2Temp =data.list[8].main.temp;
            day2Temp.text(date2Temp);

            var icon3 = data.list[16].weather[0].icon; // Day 3 Forecast
            var iconUrl3 = "https://openweathermap.org/img/w/" + icon3 + ".png";
            var date3 = moment.unix(data.list[16].dt).format("dddd");
            day3.text(date3);
            day3Icon.attr("src", iconUrl3);
            var date3Temp = data.list[16].main.temp;
            day3Temp.text(date3Temp);

            var icon4 = data.list[24].weather[0].icon; // Day 4 Forecast
            var iconUrl4 = "https://openweathermap.org/img/w/" + icon4 + ".png";
            var date4 = moment.unix(data.list[24].dt).format("dddd");
            day4.text(date4);
            day4Icon.attr("src", iconUrl4);
            var date4Temp = data.list[24].main.temp; 
            day4Temp.text(date4Temp);

            var icon5 = data.list[32].weather[0].icon; // Day 5 Forecast
            var iconUrl5 = "https://openweathermap.org/img/w/" + icon5 + ".png";
            var date5 = moment.unix(data.list[32].dt).format("dddd");
            day5.text(date5);
            day5Icon.attr("src", iconUrl5);
            var date5Temp = data.list[32].main.temp; 
            day5Temp.text(date5Temp);

            var storeObject = {
                "cityName": cityName,
                "country": country,
                "date": date, 
                "temp": temp,
                "humidity": humidity,
                "wind": wind,
                "iconUrl1": iconUrl1,
                "iconUrl2": iconUrl2,
                "date2": date2,
                "date2Temp": date2Temp,
                "iconUrl3": iconUrl3,
                "date3": date3,
                "date3Temp": date3Temp,
                "iconUrl4": iconUrl4,
                "date4": date4,
                "date4Temp": date4Temp,
                "iconUrl5": iconUrl5,
                "date5": date5,
                "date5Temp": date5Temp,
            }
            var items = localStorage.getItem("items");
            if (items === null){
                items = [];
            } else {
                items = JSON.parse(items);
            }
            items.push(storeObject);
            var allItems = JSON.stringify(items);
            localStorage.setItem("items", allItems);
        });
};

function showHistoryBtn() {
    var items = localStorage.getItem("items");
    items = JSON.parse(items);

    if (items !== null) {
        var counter = items.length - 1;

        for (var i =0; i <= counter ; i++) {
            var button = $("<button>");
            button.addClass("list-group-item");
            button.text(items[i].cityName);
            button.attr("name", items[i].cityName);
            historyList.append(button);
        }
    } else {
        console.log("Empty local storage");
    }
}

function showHistoryData(e) {
    e.preventDefault;
    welcomeText.show(1000); 
    containerBlock.show(2000);
    card.show(1000);
    var items = localStorage.getItem("items");
    items = JSON.parse(items);
    var nameOfCity = e.target.getAttribute("name");
    var obj = items.find(i => i.cityName === nameOfCity);

    citySpan.text(obj.cityName);
    dateSpan.text(obj.date);
    tempSpan.text(obj.temp);
    humiditySpan.text(obj.humidity);
    windSpan.text(obj.wind);
    day1.text("TODAY");
    day1Icon.attr("src", obj.iconUrl1);
    day1Temp.text(obj.temp); 
    day2.text(obj.date2);
    day2Icon.attr("src", obj.iconUrl2);
    day2Temp.text(obj.date2Temp);
    day3.text(obj.date3);
    day3Icon.attr("src", obj.iconUrl3);
    day3Temp.text(obj.date3Temp);
    day4.text(obj.date4);
    day4Icon.attr("src", obj.iconUrl4);
    day4Temp.text(obj.date4Temp);
    day5.text(obj.date5);
    day5Icon.attr("src", obj.iconUrl5);
    day5Temp.text(obj.date5Temp);
}

showHistoryBtn(); // Show recent searhes
historyList.on("click", showHistoryData); // history button will show data
searchBtn.on("click", getUserInput); // function will execute when user clicks search