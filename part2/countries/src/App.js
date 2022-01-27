import React, { useEffect, useState } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (item) => {
    setFilter(item)
  }

  const clearFilter = () => {
    setFilter('')
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <Filter value={filter} onChange={handleFilterChange} clearFilter={clearFilter} />
      <Countries countries={countries} filter={filter} onClick={showCountry} />
    </>
  );
}

export default App;
