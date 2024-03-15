import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from "./services/persons"

const Search = ({persons, setShowPersons})=>{
  const search = (value, persons)=>{
      const found = persons.filter(person => person.name.toLowerCase().startsWith(value.toLowerCase()))
      setShowPersons(found)
  }
  return(
    <div>
       Filter shown with <input onChange={(e)=>{search(e.target.value, persons)}}/>
    </div>
  )
}

const Numbers = ({persons, setShowPersons})=>{

  return(
    <div>
      {persons.map((person,index)=>(
          <p key={index}>{person.name} {person.number} <button id={person.id} onClick={ () =>{
            if(window.confirm(`Delete ${person.name}`)){
              personService.deletePerson(person.id).then(()=>{
                personService.getAll()
                .then(response=>{
                  console.log(response.data)
                  setShowPersons(response.data)
                })}
              )
            }
          }}>Delete</button>
          </p>
        ))}
    </div>
  )

}



const PersonsForm = ({nameChange, numberChange, addName})=>{
  return(
    <div>
      <form>
          <div>
            name: <input onChange={nameChange} />
          </div>
          <div>
            number: <input onChange={numberChange} />
          </div>
          <div>
            <button type='submit' onClick={addName}>add</button>
          </div>
      </form>
    </div>
  )
}


const Notification = ({ message, status }) => {
  const [notificationStyle, setNotificationStyle] = useState("success");

  useEffect(() => {
    if (status === false) {
      setNotificationStyle("error");
    } else {
      setNotificationStyle("success");
    }
  }, [status]);

  if (message === null) {
    return null;
  }

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  );
};

const App = () => {

  const [persons, setPersons] = useState([])
  const [showPersons, setShowPersons] = useState([...persons])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState(0)
  const [successMessage,setSuccessMessage] = useState(null)
  const [status, setStatus] = useState(true)

  useEffect(()=>{
    console.log("effect");
    personService.getAll()
    .then(response=>{
      setPersons(response.data)
      setShowPersons(response.data)
    })
  },[])  

  const nameChange = (e)=>{ 
    setNewName(e.target.value)
  }

  const numberChange = (e)=>[
    setNewNumber(e.target.value)
  ]
  const addName = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        
        personService.update(existingPerson.id, updatedPerson)
          .then(response => {
            const updatedPersons = persons.map(person =>
              person.id === existingPerson.id ? response.data : person
            );
            setPersons(updatedPersons);
            setShowPersons(updatedPersons);

            setSuccessMessage(`Updated ${newName}`)
            setStatus(true)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000);
          })
          .catch(error => {
            // Manejar errores de la actualización
            setStatus(false)
            setSuccessMessage(`Information of ${newName} has already been removed from server`)
          });
      }
    } else {

      let object = {
        name:newName, number: newNumber
      }

      personService.create(object)
      .then(response => {
        setPersons([...persons, response.data]);
        setShowPersons([...persons, response.data])
        setSuccessMessage(`Add ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
        
      })

      
    }

    setNewName('');
  };

  

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} status={status}/>
      <Search persons={persons} setShowPersons={setShowPersons}/>
      <h2>Add new person</h2>
     
      <PersonsForm nameChange={nameChange} numberChange={numberChange} addName={addName}/>
      <h2>Numbers</h2>
        <Numbers persons={showPersons} setShowPersons={setShowPersons} />
    </div>
  )
}

export default App
