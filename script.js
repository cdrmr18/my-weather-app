// API weather set up
let apiKey = "ce96567bcfe36200b8c50bb6f61e4a04";
let city = "Sydney";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`

// Make a request for a user with a given ID
axios.get(`${apiUrl}&appid=${apiKey}`)
  .then(function (response) {
    // handle success
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp)
    let tempDescription = document.querySelector("#weather-description")
    let temperatureEle = document.querySelector("#current-temp")
    temperatureEle.innerHTML = `${temperature}°F`;
    tempDescription.innerHTML = response.data.weather[0].description;
  })

let h1 = document.querySelector("#city-name")
h1.innerHTML = city;

// setting date and time
let now = new Date();

let day = now.getDay();
let month = now.getMonth();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

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
  "Dec",
];
month = months[month];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

day = days[day];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${month} ${date}, ${year} ${hour}:${minutes}`;

// setting search bar
let citySubmit = document.querySelector("#submit-city");

function citySearch(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-search");
  let changeCity = document.querySelector("#city-name");
  changeCity.innerHTML = `${citySearched.value}`;
}

citySubmit.addEventListener("click", citySearch);

// adding link to convert temp

let farenheight = document.querySelector("#faren");
let celcius = document.querySelector("#celc");

function convertFaren(event) {
  event.preventDefault();
  let currentFaren = document.querySelector("#current-temp");
  currentFaren.innerHTML = "86°";
}

farenheight.addEventListener("click", convertFaren);

function convertCelc(event) {
  event.preventDefault();
  let currentCelc = document.querySelector("#current-temp");
  currentCelc.innerHTML = "44°";
}

celcius.addEventListener("click", convertCelc);
