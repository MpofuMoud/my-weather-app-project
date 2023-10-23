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
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".condition").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector.querySelector("#icon").innerHTML =
    response.data.weather[0].icon;
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
