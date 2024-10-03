import { useState } from "react";

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handlePersonFormSubmit = (event) => {
    event.preventDefault();
    addPerson(newName, newPhoneNumber);
    setNewName("");
    setNewPhoneNumber("");
  };

  return (
    <form onSubmit={handlePersonFormSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div>
        number:
        <input value={newPhoneNumber} onChange={handleNewPhoneNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
