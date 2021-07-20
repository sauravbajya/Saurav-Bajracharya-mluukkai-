import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

//6+5+6+4hrs
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.type === 'success') {
    return <div className="success">{message.message}</div>
  } else if (message.type === 'error') {
    return <div className="error">{message.message}</div>
  } else if (message.type === 'warning') {
    return <div className="warning">{message.message}</div>
  } else {
    return null
  }
}
const Filter = ({ handleChangeFilter }) => (
  <>
    filter shown with: <input onChange={handleChangeFilter} />
  </>
)

const PersonForm = ({
  newName,
  newNumber,
  addNewName,
  handleChangeName,
  handleChangeNumber,
}) => (
  <>
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

const Person = ({ person, handleDeletePerson }) => (
  <>
    <p>
      {person.name} {person.number}&nbsp;&nbsp;
      <button onClick={handleDeletePerson}>delete</button>
    </p>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const numbersToShow = showAll
    ? persons
    : persons.filter((person) => {
        if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
          return person
        }
        return ''
      })

  const addNewName = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
    }

    if (!persons.find((person) => person.name === newName)) {
      personsService.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage({
          message: `Added ${returnedPerson.name}`,
          type: 'success',
        })
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    } else {
      const person = persons.find((person) => person.name === newName)
      const changedPerson = { ...person, number: newNumber }
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        personsService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            )
            setNewName('')
            setNewNumber('')
            setNotificationMessage({
              message: `Changed ${returnedPerson.name}'s number sucessfully`,
              type: 'success',
            })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setNotificationMessage({
              message: `the person ${person.name} was already deleted from the server`,
              type: 'error',
            })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)

            setPersons(persons.filter((n) => n.id !== person.id))
          })
      }
    }
  }
  const handleChangeName = (event) => setNewName(event.target.value)
  const handleChangeNumber = (event) => setNewNumber(event.target.value)
  const handleChangeFilter = (event) => {
    setShowAll(!showAll)
    setNewFilter(event.target.value)
  }
  const handleDeletePerson = (id) => {
    const person = persons.find((n) => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.deletePerson(id)
      setNotificationMessage({
        message: `The person ${person.name} was deleted from the server`,
        type: 'warning',
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setPersons(persons.filter((person) => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter handleChangeFilter={handleChangeFilter} />
      <h2>add a new</h2>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>
      {numbersToShow.map((person) => (
        <Person
          person={person}
          key={person.id}
          handleDeletePerson={() => handleDeletePerson(person.id)}
        />
      ))}
    </div>
  )
}

export default App
