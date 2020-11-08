// setting date and time
let now = new Date();

let day = now.getDay();
let month = now.getMonth();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
month = months[month];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

day = days[day];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${month} ${date}, ${year} ${hour}:${minutes}`;

// setting search bar and weather info
let citySubmit = document.querySelector("#submit-city");

function search(city) {
  let units = "imperial";
  let apiKey = "ce96567bcfe36200b8c50bb6f61e4a04";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
  axios.get(apiUrl).then(displayForcast)
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`
}

  function displayForcast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
        <div class="col-2 forecast-time">
            <h3>
              ${formatHours(forecast.dt * 1000)}
            </h3>
            <img 
              class= "forecast-images"
              src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
              alt=""
            />
            <div class="forecast-temp">
              High <strong>${Math.round(forecast.main.temp_max)}°</strong> Low ${Math.round(forecast.main.temp_min)}°
            </div>
          </div>
        `;
    }
  }

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherCondition").innerHTML =
    response.data.weather[0].description;
  console.log();

  let icon = response.data.weather[0].icon;
  document.querySelector("#icon").setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    document.querySelector("#icon").setAttribute(
      "alt",
      response.data.weather[0].description
    );
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

citySubmit.addEventListener("click", handleSubmit);

search("New York");