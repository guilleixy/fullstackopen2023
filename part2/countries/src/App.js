import React, { useState, useEffect } from 'react';

const SearchBar = ({ setSearch }) => {
  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      find countries
      <input type='text' onChange={updateSearch} />
    </div>
  );
};

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current_weather=true`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      })
      .catch((error) => {
        console.error('Error fetching weather:', error);
      });
  }, [country]);

  if (!weather) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((languageCode) => (
          <li key={languageCode}>
            {country.languages[languageCode]}
          </li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} style={{ maxWidth: '200px' }} />
      <h3>Weather:</h3>
      <p>Current temperature: {weather.current_weather.temperature} Cº</p>
      <p>Wind Speed: {weather.current_weather.windspeed} m/s</p>
    </div>
  );
};

const CountryList = ({ countries, onCountrySelect, setSelectedCountry }) => {
  if (countries.length === 0) {
    return <p>No countries found.</p>;
  }

  if (countries.length === 1) {
    const country = countries[0];
    console.log(country)
    setSelectedCountry(country);
    return(
      <></>
    )
  }

  if (countries.length <= 10) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}
          <button onClick={() => onCountrySelect(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  }
  else{
    return <p>Too many matches, specify another filter.</p>; 
  }
};

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (search.trim() === '') {
      setCountries([]);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
    console.log('Search term changed:', search);
  }, [search]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <SearchBar setSearch={setSearch} />
      <CountryList countries={countries}  onCountrySelect={handleCountrySelect} setSelectedCountry={setSelectedCountry} />
      {selectedCountry && <CountryInfo country={selectedCountry} />}
    </div>
  );
}

export default App;
