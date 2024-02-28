const containerDiv = document.createElement("div");
containerDiv.classList.add("container");
document.body.appendChild(containerDiv);

const cardsContainer = document.createElement("div");
cardsContainer.classList.add("row");
cardsContainer.id = "cardsContainer";
containerDiv.appendChild(cardsContainer);

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const cardsContainer = document.getElementById("cardsContainer");
    console.log(data);
    data.forEach((country) => {
      const card = document.createElement("div");
      card.classList.add("card", "col-sm-12", "col-lg-4");

      const headerDiv = document.createElement("div");
      headerDiv.classList.add("card-header");
      headerDiv.innerHTML = `<h1>${country.name.common}</h1>`;
      card.appendChild(headerDiv);
      const bodyDiv = document.createElement("div");
      bodyDiv.className = "card-body";

      bodyDiv.innerHTML = `
              
              <img src="${country.flags.svg}" alt="${country.name.common} Flag" width="80%" height="40%">
              <p>Capital: ${country.capital}</p>
              <p>Region: ${country.region}</p>
              <p>Country Code: ${country.altSpellings[0]}</p>
              
              <button class="btn btn-primary" onclick="getWeather(${country.latlng[0]}, ${country.latlng[1]})">Click for Weather</button>
          `;
      card.appendChild(bodyDiv);

      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => console.log("Error fetching country data:", error));

function getWeather(lat, lon) {
  const apiKey = "f5362f7d2c99aa3f200bb0f044be9e70";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Display weather information
      alert(
        `Current Weather: ${data.weather[0].main}, ${data.weather[0].description} and temperature is${Math.ceil(data.main.temp-273.15)} °C `
      );
    })
    .catch((error) => console.log("Error fetching weather data:", error));
}
