const Persons = ({ persons, nameFilter, remove }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => remove(person.id)}>{'delete'}</button>
        </div>
      ))}
    </>
  )
}

export default Persons
