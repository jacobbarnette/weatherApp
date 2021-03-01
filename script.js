let cityName = 'Los Angeles';
const apiKey = 'a0e789560293d5ccee72e778407f9e19';
let unit ='imperial'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`;

async function getWeather(){
    const response = await fetch(url, {mode:'cors'});
    const data = await response.json();
   formatWeather(data);
  
}getWeather();


function formatWeather(data){
    let newWeather = {
        name: data.name,
        weather: data.weather[0].main,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: Math.round(data.main.humidity),
        windSpeed: Math.round(data.wind.speed)
    }
    /*get wind degrees and convert to direction*/
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW','W', 'NW'];
    let degrees = 10;
    degrees = degrees * 8 / 360;
    degrees = Math.round(degrees, newWeather.windSpeed);
    degrees = (degrees + 8) % 8;
    newWeather.windDirection = directions[degrees];
    createWeatherCard(newWeather);
}

function createWeatherCard(newWeather){
    const cityWeather = document.getElementById('cityWeather');
    cityWeather.textContent = `${newWeather.weather}`
    const cityHeader = document.getElementById('cityHeader');
    cityHeader.textContent = newWeather.name;
    const cityTemp = document.getElementById('cityTemp');

    cityTemp.textContent = `${newWeather.temp} ${'\xB0'} `;
    const feelsLike = document.getElementById('feelsLike');
    feelsLike.textContent = `Feels Like: ${newWeather.feelsLike} ${'\xB0'}`;
    const humidty = document.getElementById('humidity');
    humidty.textContent = `Humidity: ${newWeather.humidity} %`;
    const windSpeed = document.getElementById('windSpeed');
    windSpeed.textContent = `Wind Speed: ${newWeather.windSpeed} MPH ${newWeather.windDirection}`
}

const searchCity = document.getElementById('searchCity');
searchCity.addEventListener('click', async function(e){
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=${unit}&appid=${apiKey}`;
    const response = await fetch(url, {mode:'cors'});
   const data = await response.json();
  formatWeather(data);
});
