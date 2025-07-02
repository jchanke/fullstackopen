import { useState, useEffect } from 'react'

import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(null)
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleQueryChange = (event) => {
    const text = event.target.value
    setQuery(text)
    if (countries !== null) {
      const newResults = countries.filter(c => c.name.common.toLowerCase().includes(text.toLowerCase()))
      setResults(newResults)
      if (country === null && newResults.length === 1) {
        setCountry(newResults[0])
      } else if (newResults.length !== 1) {
        setCountry(null)
        setWeather(null)
      }
    }
  }

  useEffect(() => {
    countryService
      .allCountries()
      .then(countries => {
        setCountries(countries)
        setResults(countries)
      })
      .catch(error => console.err(error))
  }, [])

  useEffect(() => {
    if (country === null || !country.capitalInfo || !country.capitalInfo.latlng) {
      return
    }
    const [lat, lon] = country.capitalInfo.latlng
    weatherService
      .getWeather(lat, lon)
      .then(w => setWeather(w))
  }, [country])

  return (
    <div>
      <div>find countries <input value={query} onChange={handleQueryChange}></input></div>
      <Results results={results} setCountry={setCountry} />
      <Country country={country} weather={weather} />
    </div>
  )
}

const Results = ({ results, setCountry }) => {
  if (results === null) {
    return <div>Loading countries...</div>
  } else if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (results.length > 1) {
    return results.map(c => <ResultsLine key={c.cca2} country={c} setCountry={setCountry} />)
  } else if (results.length === 0) {
    return <div>No results found, try another query</div>
  }
}

const ResultsLine = ({ country, setCountry }) =>
  <div>
    {country.name.common} <button onClick={() => setCountry(country)}>Show</button>
  </div>

const Country = ({ country, weather }) => {
  if (country === null) {
    return
  }
  const languages = Object.values(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {
          languages.map(language =>
            <li key={language}>{language}</li>
          )
        }
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather country={country} weather={weather} />
    </div >
  )
}

const kelvinToCelsius = k => (k - 273.15).toFixed(2)

const Weather = ({ country, weather }) => {
  if (weather === null) {
    return
  }
  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <div>Temperature {kelvinToCelsius(weather.main.temp)} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <div>Wind {weather.wind.speed.toFixed(1)} m/s</div>
    </>
  )
}

export default App
