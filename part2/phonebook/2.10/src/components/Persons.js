const Persons = ({ persons, nameFilter }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.phoneNumber}
        </div>
      ))}
    </>
  );
};

export default Persons;
