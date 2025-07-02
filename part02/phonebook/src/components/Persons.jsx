const Persons = ({ persons, filter, removePerson }) =>
  <>
    {
      persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person =>
          <PersonsLine key={person.name} person={person} removePerson={removePerson} />
        )
    }
  </>

const PersonsLine = ({ person, removePerson }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      removePerson(person.id)
    }
  }
  return (
    <div>{person.name} {person.number} <button onClick={handleDelete}>delete</button></div>
  )
}

export default Persons