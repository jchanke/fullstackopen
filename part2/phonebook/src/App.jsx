import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(null)

  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName.trim())) {
      if (window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName.trim())
        updatePerson(person.id, { ...person, number: newNumber })
      }
      return
    }
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    }
    addPerson(newPerson)
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (newPerson) => {
    noteService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        displaySucess(`Added ${person.name}`)
      })
      .catch(error => console.err(error))
  }

  const removePerson = (id) => {
    noteService
      .remove(id)
      .then(_ => {
        const name = persons.find(p => p.id === id).name
        displaySucess(`Removed ${name}`)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => console.err(error))
  }

  const updatePerson = (id, newPerson) => {
    noteService
      .update(id, newPerson)
      .then(updated => {
        setPersons(persons.map(p => p.name === updated.name ? updated : p))
        displaySucess(`Updated number of ${updated.name}`)
      })
      .catch(_ => displayError(`${newPerson.name} was already removed from server`)
      )
  }

  const displaySucess = (message) => {
    setNotification(message);
    setIsError(false)
    setTimeout(() => {
      setNotification(null)
      setIsError(null)
    }, 5000);
  }

  const displayError = (message) => {
    setNotification(message)
    setIsError(true)
    setTimeout(() => {
      setNotification(null)
      setIsError(null)
    }, 5000);
  }

  useEffect(() => {
    noteService
      .getAll()
      .then(newPersons => setPersons(newPersons))
      .catch(error => console.err(error))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />

    </div>
  )
}

export default App
