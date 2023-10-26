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
  <div class="weather-forecast-day">${formatDay(forecastDay.time)}</div>
  <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
    forecastDay.condition.icon
  }.png"
  alt="" 
  width="45px"/>
  <div class="weather-temp"><span class="max">${Math.round(
    forecastDay.temperature.maximum
  )}° </span>
  <span class="min">${Math.round(
    forecastDay.temperature.minimum
  )}°</span></div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b93bfbo44bd8a88678e0t635d05036d5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&units=metric`;
  axios.get(`${apiUrl}&key=${apiKey}`).then(dailyForecast);
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
  document.querySelector(".location").innerHTML = response.data.city;
  document.querySelector(".country").innerHTML = response.data.country;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector(".description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  celsiusTemperature = response.data.temperature.current;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}
function searchLocation(position) {
  let apiKey = "b93bfbo44bd8a88678e0t635d05036d5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&key=${apiKey}`).then(showTemperature);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", currentLocation);

function searchCity(city) {
  let apiKey = "b93bfbo44bd8a88678e0t635d05036d5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&units=metric`;
  axios.get(`${apiUrl}&key=${apiKey}`).then(showTemperature);
}
searchCity("Warsaw");
