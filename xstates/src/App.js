import logo from './logo.svg';
import './App.css';
import  { useEffect, useState } from 'react';

function App() {
  const [countries,setCountries] = useState([]);
  const [states,setStates] = useState([]);
  const [cities,setCities] = useState([]);
  const [selectedCountry,setSelectedCountry] = useState("");
  const [selectedState,setSelectedState] = useState("");
  const [selectedCity,setSelectedCity] = useState("");

  const getCountries = async() => {
    try {
      const data = await fetch("https://crio-location-selector.onrender.com/countries");
      const res = await data.json();
      setCountries(res);
    } catch(e) {
      console.log("Error in fetching countries",e);
    }
  }

  const getStates = async() => {
    try {
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
      const res = await data.json();
      console.log(res,"res")
      setStates(res);
    } catch(e) {
      console.log("Error in fetching states",e);
    }
  }

  const getCities = async() => {
    try {
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
      const res = await data.json();
      console.log(res,"city res")
      setCities(res);
    } catch(e) {
      console.log("Error in fetching cities",e);
    }
  }

  useEffect( () => {
    getCountries();
  },[])

  useEffect( () => {
    if(selectedCountry) {
      getStates();
    }
  },[selectedCountry])

  useEffect( () => {
    if(selectedCountry && selectedCity) {
      getCities();
    }
    
  },[selectedCountry,selectedState])
 
  return (
    <div className="city-selector">
        <h1>Select Location</h1>
        <div className="dropdowns">
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="dropdown">
            <option value="" disabled>Select Country</option>
            {countries.map((country) => { 
              return <option key={country} value={country}> {country} </option>
            })}
          </select>

          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="dropdown" disabled={!selectedCountry}>
            <option value="" disabled >Select State</option>
            {states.map((state) => { 
              return <option key={state} value={state}> {state} </option>
            })}
          </select>

          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="dropdown" disabled={!selectedState}>
            <option value="" disabled>Select City</option>
            {cities.map((city) => { 
              return <option key={city} value={city}> {city} </option>
            })}
          </select>
        </div>
    </div>
  );
}

export default App;
