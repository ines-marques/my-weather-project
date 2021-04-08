      let now = new Date();
      let currentTime = document.querySelector("#current-time");
      let hours = now.getHours();
      if (hours < 10) {
      hours = `0${hours}`;
      }
      let minutes = now.getMinutes();
      if (minutes < 10) {
      minutes = `0${minutes}`;
      }
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[now.getDay()];

      currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

      function formatDay(timestamp) {
        let date = new Date(timestamp * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[day];
      }

      function displayForecast(response) {
        let forecast = response.data.daily;
        let forecastElement = document.querySelector("#forecast");
        let forecastHTML = `<div class="row">`;
        forecast.forEach(function(forecastDay, index) {
          if (index < 5) {
          forecastHTML = forecastHTML + `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt=""
            width="42"/>
            <div class="weather-forecast-temperature">
              <span class="temperature-max">${Math.round(forecastDay.temp.max)}º</span>
              <span class="temperature-min">${Math.round(forecastDay.temp.min)}º</span>
            </div>
          </div>
      `;
          }
        });
        
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
      }

      function changeCity(event) {
        event.preventDefault();
        let searchInput = document.querySelector("#write-city");
        let citySearch= document.querySelector("#current-city");
        citySearch.innerHTML = `${searchInput.value}`;
      }
      let form = document.querySelector("#search-city");
      form.addEventListener("submit", searching);

      function getForecast(coordinates) {
        let apiKey = "178be0a79146aa22863d056738d4f9b4";
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayForecast);
      }

      function changeTemperature(response) {
        document.querySelector("#current-temperature").innerHTML = `${Math.round(response.data.main.temp)}`;
        document.querySelector("#current-city").innerHTML = response.data.name;
        document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)}`;
        document.querySelector("#percentage").innerHTML = response.data.main.humidity;
        document.querySelector("#description").innerHTML = response.data.weather[0].description;
        document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

        celsiusTemperature = response.data.main.temp;

        getForecast(response.data.coord);
      }

      function searchCity(city) {
        let key = "178be0a79146aa22863d056738d4f9b4";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
        axios.get(url).then(changeTemperature);
      }

      function searching (event) {
        event.preventDefault();
        let city = document.querySelector("#write-city").value
        searchCity(city)
      }

      function showFahrenheitTemperature (event) {
        event.preventDefault();
        let fahrenheitConversion = (celsiusTemperature * 9) / 5 + 32;
        let temperatureElement = document.querySelector("#current-temperature");
        celsius.classList.remove("showing");
        fahrenheit.classList.add("showing");
        temperatureElement.innerHTML = Math.round(fahrenheitConversion);
      }

      function showCelsiusTemperature (event) {
        event.preventDefault();
        celsius.classList.add("showing");
        fahrenheit.classList.remove("showing")
        let temperatureElement = document.querySelector("#current-temperature");
        temperatureElement.innerHTML = Math.round(celsiusTemperature);
      }

      let fahrenheit = document.querySelector("#fahrenheit");
      fahrenheit.addEventListener("click", showFahrenheitTemperature);

      let celsius = document.querySelector("#celsius");
      celsius.addEventListener("click", showCelsiusTemperature)

      let celsiusTemperature = null;

      searchCity("Lisbon")