const weatherApp = document.querySelector('.weather-app');
const locationElement = document.querySelector('#location');
const weatherIconElement = document.querySelector('#weather-icon');
const temperatureElement = document.querySelector('#temperature');
const unitToggleElement = document.querySelector('#unit-toggle');

let currentUnit = 'F'; // default unit is Fahrenheit

// Get user location using HTML5 Geolocation
navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Use freeCodeCamp Weather API to get weather data
    fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`)
       .then(response => response.json())
       .then(data => {
            const weather = data.weather[0];
            const temperature = data.main.temp;
            const location = data.name;

            // Update UI
            locationElement.textContent = location;
            weatherIconElement.innerHTML = getWeatherIcon(weather.icon);
            temperatureElement.textContent = `${temperature}°${currentUnit}`;

            // Add event listener to unit toggle button
            unitToggleElement.addEventListener('click', () => {
                currentUnit = currentUnit === 'F'? 'C' : 'F';
                temperatureElement.textContent = `${temperature}°${currentUnit}`;
                unitToggleElement.textContent = `°${currentUnit}`;
            });
        });
});

// Function to get weather icon based on weather condition
function getWeatherIcon(icon) {
    switch (icon) {
        case '01d':
            return '<i class="fas fa-sun"></i>';
        case '02d':
            return '<i class="fas fa-cloud-sun"></i>';
        case '03d':
            return '<i class="fas fa-cloud"></i>';
        case '04d':
            return '<i class="fas fa-cloud-rain"></i>';
        case '09d':
            return '<i class="fas fa-cloud-showers-heavy"></i>';
        case '10d':
            return '<i class="fas fa-cloud-rain"></i>';
        case '11d':
            return '<i class="fas fa-thunderstorm"></i>';
        case '13d':
            return '<i class="fas fa-snowflake"></i>';
        default:
            return '<i class="fas fa-question"></i>';
    }
}