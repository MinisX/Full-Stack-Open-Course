import { useEffect, useState } from "react"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

import personsService from './services/personsService'
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      console.log('data fetched from the server')
    })
  },[])

  const addPerson = (newName, newPhoneNumber) => {
    const newPerson = {
      name: newName,
      phoneNumber: newPhoneNumber,
    };

    if (!doesPersonExist(newPerson)) {
      personsService
      .create(newPerson)
      .then(returnedPerson => {
        setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        setPersons(persons.concat(returnedPerson));
      })
    } else {
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        personsService
        .update(persons.find(person => person.name === newPerson.name).id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
        })
      }
    }
  };

  const doesPersonExist = (newPerson) => {
    return persons.some(
      (obj) =>
        obj.name === newPerson.name
    );
  };

  const remove = (personId) => {
    const personToRemove = persons.find(person => person.id === personId);
  
    if (personToRemove && window.confirm(`Delete ${personToRemove.name}?`)) {
      personsService.remove(personId)
        .then((deletedPerson) => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id));
        })
        .catch(error => {
          console.error("Error removing person:", error);
          alert("An error occurred while trying to delete the person.");
        });
    }
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} remove={remove} />
    </div>
  );
};

export default App;
