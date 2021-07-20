import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Find = ({ handleChangeFind }) => (
  <>
    {' '}
    find countries: <input onChange={handleChangeFind} />
  </>
)
const Weather = ({ capital }) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [capital])
  if (weather) {
    return (
      <div>
        <h3>Weather in {weather.location.name}</h3>
        <p>
          <strong>Temperature: </strong>
          {weather.current.temperature} Celcius
        </p>
        <img src={weather.current.weather_icons[0]} alt="icon" />
        <p>
          <strong>wind: </strong>
          {weather.current.wind_speed}mph direction {weather.current.wind_dir}
        </p>
      </div>
    )
  } else {
    return <div>loading....</div>
  }
}

const Display = ({ foundCountries }) => {
  return (
    <>
      {foundCountries.map((country) => (
        <div key={country.alpha3Code}>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map((language) => (
              <li key={language.iso639_2}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt="flag" width="200" height="200" />
          <Weather capital={country.capital} />
        </div>
      ))}
    </>
  )
}

const DisplayList = ({ foundCountries, setFoundCountries }) => {
  if (foundCountries.length === 1) {
    return (
      <>
        <Display foundCountries={foundCountries} />
      </>
    )
  } else if (foundCountries.length < 10) {
    return (
      <>
        {foundCountries.map((country) => (
          <p key={country.alpha3Code}>
            {country.name}{' '}
            <button
              onClick={() =>
                setFoundCountries(
                  foundCountries.filter(
                    (oneCountry) => oneCountry.name === country.name
                  )
                )
              }
            >
              show
            </button>
          </p>
        ))}
      </>
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [foundCountries, setFoundCountries] = useState([])
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleChangeFind = (event) => {
    setSearchTerm(event.target.value)
    handleFoundCountries()
  }

  const handleFoundCountries = () => {
    setFoundCountries(
      countries.filter((country) => {
        if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return country
        }
        return ''
      })
    )
  }

  return (
    <>
      <Find handleChangeFind={handleChangeFind} />
      <DisplayList
        foundCountries={foundCountries}
        setFoundCountries={setFoundCountries}
      />
    </>
  )
}

export default App
