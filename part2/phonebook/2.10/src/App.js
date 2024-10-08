import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [nameFilter, setNameFilter] = useState("");

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
