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
}
function showWeather(response) {
  console.log(response.data)
  console.log(response.data.name);
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
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

citySubmit.addEventListener("click", handleSubmit);

search("New York");