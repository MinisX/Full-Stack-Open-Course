import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      console.log('data fetched from the server')
    })
  },[])

  const addPerson = (newName, newPhoneNumber) => {
    const newPerson = {
      name: newName,
      phoneNumber: newPhoneNumber,
      id: persons.length + 1,
    };

    if (!doesPersonExist(newPerson)) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} ${newPhoneNumber} is already added to phonebook`);
    }
  };

  const doesPersonExist = (newPerson) => {
    return persons.some(
      (obj) =>
        obj.name === newPerson.name && obj.phoneNumber === newPerson.phoneNumber
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
