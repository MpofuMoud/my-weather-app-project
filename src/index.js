let now = new Date();
{
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dates = document.querySelector(".date");
  dates.innerHTML = `${day}  ${date} ${month} | ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function dailyForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#dailyforecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class ="col-2">
  <div class="weather-forecast-hour">${formatDay(forecastDay.dt)}</div>
  img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png"
          alt=""
          width="42"/>
  <div class="weather-temp"><span class="max">${Math.round(
    forecastDay.temp.max
  )}° </span>
  <span class="min">${Math.round(forecastDay.temp.min)}°</span></div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "40b745c14eadad7b7c4e6e4bf3b70103";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(dailyForecast);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search");
  searchCity(city.value);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", changeCity);

function showTemperature(response) {
  console.log(response.data);
  document.querySelector(".location").innerHTML = response.data.name;
  document.querySelector(".country").innerHTML = response.data.sys.country;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchLocation(position) {
  let apiKey = "fa4d98a1b55bfa6e99bb8f32851d7b49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", currentLocation);

function searchCity(city) {
  let apiKey = "fa4d98a1b55bfa6e99bb8f32851d7b49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
searchCity("Warsaw");
dailyForecast();

function celsiusUnitsChange(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
function fahrenheitUnitsChange(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitUnits = document.querySelector("#fahrenheit-link");
fahrenheitUnits.addEventListener("click", fahrenheitUnitsChange);

let celsiusUnits = document.querySelector("#celsius-link");
celsiusUnits.addEventListener("click", celsiusUnitsChange);
