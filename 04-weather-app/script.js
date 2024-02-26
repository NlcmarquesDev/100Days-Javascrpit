import APIKEY from "./env.js";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const weatherImage = {
  Clouds: "./images/cloud.png",
  Clear: "./images/clear.png",
  Mist: "./images/mist.png",
  Rain: "./images/rain.png",
  Snow: "./images/snow.png",
};

function getWeather(getWeather) {
  console.log(getWeather);
  for (let weather in weatherImage) {
    if (weather === getWeather) return weatherImage[weather];
  }
}

search.addEventListener("click", async (event) => {
  const city = document.querySelector(".search-box input").value;
  if (city === "") return;

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
  const res = await fetch(APIUrl);
  const data = await res.json();
  if (data.cod === "404") {
    container.style.height = "500px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fade-in");
    return;
  }
  error404.style.display = "none";
  error404.classList.remove("fade-in");

  const image = weatherBox.querySelector(".weather-box img");
  const temp = weatherBox.querySelector(".weather-box .temperature");
  const description = weatherBox.querySelector(" .weather-box .description");
  const humidity = weatherDetails.querySelector(
    ".weather-details .humidity span"
  );
  const wind = weatherDetails.querySelector(".weather-details .wind span");

  let temCelsius = Math.round(parseInt(data.main.temp) - 273.15);

  image.src = getWeather(data.weather[0].main);
  temp.innerHTML = `${temCelsius}<span>°C</span>`;
  description.innerHTML = `${data.weather[0].description}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;

  weatherBox.style.display = " ";
  weatherDetails.style.display = " ";
  weatherBox.classList.add("fade-in");
  weatherDetails.classList.add("fade-in");
  container.style.height = "590px ";
});
