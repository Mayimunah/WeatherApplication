
function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherIcon = document.getElementById('weatherIcon');

    const location = locationInput.value;

    const apiKey = '00de6916a256b8e51634f8fccf5cf436';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperatureKelvin = data.main.temp;
            const temperatureCelsius = temperatureKelvin - 273.15;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const weatherIconCode = data.weather[0].icon;

            weatherInfo.innerHTML = ` <p> The weather for  <b> ${location} </b> is: </p>
            <p>Temperature: <b> ${temperatureCelsius.toFixed(2)} &deg;C </b> </p>
                                    <p>Description: <b> ${description} </b> </p>
                                    <p>Humidity: <b> ${humidity}% </b> </p>
                                    <p>Wind Speed: <b> ${windSpeed} m/s </b> </p>`;

            // Display weather icon
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${weatherIconCode}.png" alt="Weather Icon">`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data';
            weatherIcon.innerHTML = ''; // Clear the weather icon in case of an error
        });


    const forecastApiKey = '00de6916a256b8e51634f8fccf5cf436';
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${forecastApiKey}`;

    // Fetch extended forecast data
    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(forecastData => {
            // Process and display forecast data in the forecast section
            displayExtendedForecast(forecastData);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            // Display an error message in the forecast section if needed
        });

}

function displayExtendedForecast(forecastData) {
    const forecastContainer = document.getElementById('forecastData');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    // Create a table element
    const forecastTable = document.createElement('table');
    forecastTable.classList.add('forecast-table');

    // Create a table row
    const forecastRow = document.createElement('tr');

    // Loop through the first 4 forecast entries
    forecastData.list.slice(0, 4).forEach(forecast => {
        // Extract relevant data for each day
        const date = new Date(forecast.dt * 1000); // Convert timestamp to Date object
        const dayOfWeek = getDayOfWeek(date.getDay());
        const temperatureCelsius = forecast.main.temp - 273.15;
        const description = forecast.weather[0].description;

        // Create a table cell for each day's forecast
        const forecastCell = document.createElement('td');
        forecastCell.innerHTML = `
            <p>${dayOfWeek}</p>
            <p>${temperatureCelsius.toFixed(2)} &deg;C</p>
            <p>${description}</p>
        `;

        // Append the table cell to the table row
        forecastRow.appendChild(forecastCell);
    });

    // Append the table row to the table
    forecastTable.appendChild(forecastRow);

    // Append the table to the forecast container
    forecastContainer.appendChild(forecastTable);
}


// Function to get the day of the week
function getDayOfWeek(dayIndex) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
}
