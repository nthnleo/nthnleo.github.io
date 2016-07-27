var callbackFunction1 = function(data) {
    var cond = data.query.results.channel.item.condition;
    var temp = cond.temp;
    var text = cond.text;
    var code = cond.code;
    var location = data.query.results.channel.location.city;
    var thunderstorm = [1, 3, 4, 37, 38, 39, 45];
    var showers = [8, 9, 10, 11, 12, 40];
    var partlyCloudy = [29, 30, 44];
    var mostlyCloudy = [26, 27, 28];
    var sun = [32, 33, 34, 36];
    var snow = [5, 6, 7, 13, 14, 15, 16, 17, 18, 35, 41, 42, 43, 46]
    var foggy = [20];
    document.getElementById("CurrW").innerHTML = "<b>Current Weather: </b>" + text;
    document.getElementById("CurrT").innerHTML = "<b>Temperature: </b>" + temp;
    document.getElementById("city").innerHTML = "<b>" + location + " Weather</b>";

    if(thunderstorm.indexOf(eval(code)) > -1) {
    	document.getElementById("weather_img").src = "img/thunderStorms.png";
    }
    else if(showers.indexOf(eval(code)) > -1) {
    	document.getElementById("weather_img").src = "img/showers.png";
    }
    else if(sun.indexOf(eval(code)) > -1) {
    	document.getElementById("weather_img").src = "img/sun.png";
    }
    else if(partlyCloudy.indexOf(eval(code)) > -1) {
    	document.getElementById("weather_img").src = "img/partlyCloudy.png";
    }
    else if(mostlyCloudy.indexOf(eval(code)) > -1) {
    	document.getElementById("weather_img").src = "img/cloudy.png";
    }
    else if(snow.indexOf(eval(code)) > -1) {
    	document.getElementById("weather_img").src = "img/snow.png";
    }
    else if(foggy.indexOf(eval(code)) > -1) {
        document.getElementById("weather_img").src = "img/foggy.jpg";
    }
    else {
    	document.getElementById("weather_img").src = "Weather Not Found";
    }
    document.getElementById("forecast").innerHTML = '';
}

function submitZip() {
    var inputElmt = document.getElementById("codeInput");
    var zipcode = inputElmt.value;

    var script = document.createElement('script');
    
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+zipcode+", United States')&format=json&callback=callbackFunction1";
    document.getElementsByTagName('head')[0].appendChild(script);
}

var callbackFunction2 = function(data) {
var forecast = data.query.results.channel.item.forecast;
var oneForecast = forecast[1].text;
	var twoForecast = forecast[2].text;
	document.getElementById("forecast").innerHTML = "<p><b>Tomorrow's Forecast: </b>" + oneForecast + "<br><b>Day After Tomorrow's Forecast: </b>" + twoForecast + "</p>";
}

function addForecast() {
	var inputElmt = document.getElementById("codeInput");
    var zipcode = inputElmt.value;

    var script = document.createElement('script');
    
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+zipcode+", United States')&format=json&callback=callbackFunction2";
    document.getElementsByTagName('head')[0].appendChild(script);
}

