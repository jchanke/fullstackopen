import axios from 'axios'

const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const VITE_API_KEY = import.meta.env.VITE_API_KEY

const getWeather = (lat, lon) => {
  return axios
    .get(`${OPEN_WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${VITE_API_KEY}`)
    .then(response => response.data)

}

export default { getWeather }