import axios from 'axios'

const COUNTRIES_BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const allCountries = () => {
  return axios
    .get(`${COUNTRIES_BASE_URL}/all`)
    .then(response => response.data)
}

const searchFor = (query) => {
  return axios
    .get(`${COUNTRIES_BASE_URL}/name/${query}`)
    .then(response => response.data)
}

export default { allCountries, searchFor }