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

      function changeCity(event) {
        event.preventDefault();
        let searchInput = document.querySelector("#write-city");
        let citySearch= document.querySelector("#current-city");
        citySearch.innerHTML = `${searchInput.value}`;
      }
      let form = document.querySelector("#search-city");
      form.addEventListener("submit", searching);

      function changeTemperature(response) {
        document.querySelector("#current-temperature").innerHTML = `${Math.round(response.data.main.temp)}ºC`;
        document.querySelector("#current-city").innerHTML = response.data.name;
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