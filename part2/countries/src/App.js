import {useEffect,useState} from "react";
import './App.css';
import {getAll} from "./services/countries"


const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const showCountrie = (countrie) => {
    setSelectedCountry(countrie);
  }

  const countriesHandle = (countries) => {
    if (countries.length === 1) {
      return (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>{countries[0].capital[0]}</p>
          <p>Area {countries[0].area}</p>
          <p>Languages</p>
          <ul>
            {Object.keys(countries[0].languages).map((key) => (
              <li key={key}>{countries[0].languages[key]}</li>
            ))}
          </ul>
          <img src={countries[0].flags.png} alt="Flag" />
        </div>
      )
    } else if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return countries.map((countrie) => (
        <p key={countrie.name.common}>
          {countrie.name.common}{' '}
          <button onClick={() => showCountrie(countrie)}>Show</button>
        </p>
      ));
    }
  }

  return (
    <div>
      {selectedCountry ? (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>{selectedCountry.capital[0]}</p>
          <p>Area {selectedCountry.area}</p>
          <p>Languages</p>
          <ul>
            {Object.keys(selectedCountry.languages).map((key) => (
              <li key={key}>{selectedCountry.languages[key]}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt="Flag" />
        </div>
      ) : (
        countriesHandle(countries)
      )}
    </div>
  );
};





function App() {
  const [value, setValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleChange = (e)=>{
    setValue(e.target.value)
    getAll()
    .then(response => {
      const filtrados = response.data.filter(objeto => objeto.name.common.toLowerCase().startsWith(value.toLowerCase()));
      setFilteredCountries(filtrados)

      if(filtrados.length > 10){
        console.log("demasiados manito")
      }else{
 
        filtrados.forEach((pais,indice)=>{
          console.log(pais.name.common)
        })}

    })
  }

  // useEffect(()=>{
  //   getAll()
  //   .then(response => {
  //     // console.log(response.data[0].name.common)
  //     const filtrados = response.data.filter(objeto => objeto.name.common.startsWith("sw"))
  //     filtrados.forEach((pais,indice)=>{
  //       console.log(pais.name.common)
  //     })
  //   })
  //   .catch(error => console.log(error))
  // }, [])

  return (
    <div className="App">
      <label>find countries</label> <input type='text' onChange={handleChange}/>

      <div>
        <Countries countries={filteredCountries}/>
      </div>
    </div>
  );
}

export default App;
