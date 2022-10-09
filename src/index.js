import axios from "axios";
const apiKey = "8623270db9f1ee7a49b633c76cafc981";
const units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchField = document.querySelector("#cityInput");
let searchButton = document.querySelector("#buttonSearch");
let currentButton = document.querySelector("#buttonCurrent");

let cityCountry = document.querySelector("#city");
let weather = document.querySelector("#weather");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");

let temperatureElement = document.querySelector(".temperature");

function getWeatherCity(e) {
  e.preventDefault();
  if (searchField.value === "") return;

  axios
    .get(`${apiUrl}${searchField.value}&units=${units}&appid=${apiKey}`)
    .then(function (response) {
      let temperature = Math.round(response.data.main.temp);
      let wind = Math.round(response.data.wind.speed);

      temperatureElement.innerHTML = temperature;
      cityCountry.innerHTML = response.data.name;
      weather.innerHTML = response.data.weather[0].main;
      humidity.innerHTML = `${response.data.main.humidity}%`;
      windSpeed.innerHTML = `${wind}km/h`;
    });
}

function getWeatherPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let wind = Math.round(response.data.wind.speed);

    temperatureElement.innerHTML = temperature;
    cityCountry.innerHTML = response.data.name;
    weather.innerHTML = response.data.weather[0].main;
    humidity.innerHTML = `${response.data.main.humidity}%`;
    windSpeed.innerHTML = `${wind}km/h`;
  });
}

function withPosition(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherPosition);
}

searchButton.addEventListener("click", (e) => getWeatherCity(e));
currentButton.addEventListener("click", (e) => withPosition(e));
