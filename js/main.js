// Weather App
(() => {
  // SELECTORS
  let icons = document.querySelectorAll('.parameters .fa-solid');
  let cityName = document.getElementById('city-name');
  let searchBtn = document.querySelector('.fa-magnifying-glass');
  let language = document.getElementById('language');
  let units = document.getElementById('units');
  let parameters = document.querySelector('.parameters');
  let cloudiness = parameters.querySelector('.cloudiness span');
  let windSpeed = parameters.querySelector('.wind-speed span');
  let humidity = parameters.querySelector('.humidity span');
  let degreesHolder = document.querySelector('.degrees-holder');
  let temperature = document.querySelector('.city-holder h2');
  let description = document.querySelector('.description-holder');
  let minTemp = document.getElementById('min');
  let maxTemp = document.getElementById('max');
  let weatherData = {
    city: '',
    units: '',
    unitSymbol: '',
    lang: '',
  };

  if (localStorage.getItem('weatherData')) {
    icons.forEach(icon => (icon.style.display = 'block'));
    weatherData = JSON.parse(localStorage.getItem('weatherData'));
    language.value = weatherData.lang;
    units.value = weatherData.units;
    APIcall.getData(weatherData.city, weatherData.units, weatherData.lang)
      .then((data) => {
          displayDetails(data);
          displayCurrentTemperature(data);
        });
  }

  //LISTENERS
  searchBtn.addEventListener('click', getWeatherData);
  cityName.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      getWeatherData();
    }
  });

  function displayDetails(data) {
    cloudiness.innerHTML = `${data.clouds.all} %`;
    windSpeed.innerHTML = `${data.wind.speed} m/s`;
    humidity.innerHTML = `${data.main.humidity} %`;
  }

  function displayCurrentTemperature(data) {
    degreesHolder.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather">
    <h2>${parseInt(data.main.temp)}${weatherData.unitSymbol}</h2>
    `;
    temperature.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    minTemp.innerHTML = `Min: ${parseInt(data.main.temp_min)}${weatherData.unitSymbol}`;
    maxTemp.innerHTML = `Max: ${parseInt(data.main.temp_max)}${weatherData.unitSymbol}`;
  }

  function getWeatherData() {
    icons.forEach(icon => (icon.style.display = 'block'));
    weatherData.city = cityName.value;
    weatherData.lang = language.value;

    switch (units.value) {
      case 'metric':
        weatherData.units = 'metric';
        weatherData.unitSymbol = '&deg;C';
        break;
      case 'standard':
        weatherData.units = 'standard';
        weatherData.unitSymbol = '&deg;K';
        break;
      case 'imperial':
        weatherData.units = 'imperial';
        weatherData.unitSymbol = '&deg;F';
        break;
      default:
        break;
    }

    if (cityName.value) {
      APIcall.getData(weatherData.city, weatherData.units, weatherData.lang)
        .then((data) => {
          if (!data) {
            alert('Wrong city name!');
          } else {
            localStorage.setItem('weatherData', JSON.stringify(weatherData));
            displayDetails(data);
            displayCurrentTemperature(data);
          }
        })
        .then((err) => console.log(err));
    } else {
      alert('You must input city name!');
    }
    cityName.value = '';
    cityName.focus();

    // APIcall.getData(cityName.value).then((data) => {
    //     displayDetails(data);
    //     displayCurrentTemperature(data);
    // }, (err) => {
    //     alert(err);
    //     cityName.value = '';
    //     cityName.focus();
    // });
  }
})()