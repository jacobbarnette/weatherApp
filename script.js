const cityName = 'Los Angeles';
const apiKey = 'a0e789560293d5ccee72e778407f9e19';
let unit ='imperial'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`;

async function getWeather(){
    const response = await fetch(url, {mode:'cors'});
    const data = await response.json();
   formatWeather(data);
   console.log(data);
}


getWeather();

function formatWeather(data){
    let newWeather = {
        name: data.name,
        weather: data.weather[0].main,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: Math.round(data.main.humidity),
        windSpeed: Math.round(data.wind.speed)

    }
    console
    console.log(newWeather.name)
    console.log(newWeather.weather);
    console.log(newWeather.temp);
    console.log(newWeather.feelsLike);
    console.log(newWeather.humidity);
    console.log(newWeather.windSpeed);
   

    /*get wind degrees and convert to direction*/
    
    const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest','west', 'northwest'];
    let degrees = 10;
    degrees = degrees * 8 / 360;
    degrees = Math.round(degrees, newWeather.windSpeed);
    degrees = (degrees + 8) % 8;
    newWeather.windDirection = directions[degrees];
   

    createWeatherCard(newWeather);
}

function createWeatherCard(newWeather){
    const cityWeather = document.getElementById('cityWeather');
    cityWeather.textContent = newWeather.weather
    const cityHeader = document.getElementById('cityHeader');
    cityHeader.textContent = newWeather.name;
    const cityTemp = document.getElementById('cityTemp');
    cityTemp.textContent = newWeather.temp;
    const feelsLike = document.getElementById('feelsLike');
    feelsLike.textContent = newWeather.feelsLike;
    const humidty = document.getElementById('humidity');
    humidty.textContent = newWeather.humidty;
    const windSpeed = document.getElementById('windSpeed');
    windSpeed.textContent = newWeather.windSpeed;
    const windDirection = document.getElementById('windDirection');
    windDirection.textContent = newWeather.windDirection;
}