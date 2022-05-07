import React, { useEffect, useState } from 'react'
import People from './components/People'
import SubmitPerson from './components/SubmitPerson'
import Filter from './components/Filter'
import { default as pbs } from './services/numbers'

const App = () => {
  const [people, setPeople] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [numberInput, setNumberInput] = useState('')
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    pbs
      .getAll()
      .then(initialPeople => setPeople(initialPeople))
  }, [])

  const handleFilterInput = (event) => {
    setFilterInput(event.target.value)
  }

  const handleNameInput = (event) => {
    setNameInput(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNumberInput(event.target.value)
  }

  const isEqualJSON = (val1, val2) => (
    JSON.stringify(val1) === JSON.stringify(val2)
  )

  const sameValues = () => {
    const sameName = !!people.find(person => isEqualJSON(person.name, nameInput))
    const sameNumber = !!people.find(person => isEqualJSON(person.number, numberInput))

    if (sameName && sameNumber) {
      return 'name and number'
    } else if (sameName) {
      return 'name'
    } else if (sameNumber) {
      return 'number'
    } else {
      return null
    }
  }

  const addPerson = (event) => {
    const newPerson = {
      name: nameInput,
      number: numberInput
    }
    event.preventDefault()
    switch (sameValues()) {
      case 'name':
        const id = people.find(person => person.name === nameInput).id

        const confirmation = window
          .confirm(`Name ${nameInput} is already added to phonebook, do you want to change the number to ${numberInput}?`)
        if (confirmation) {
          pbs.update(newPerson, id)
            .then(returnedPerson => {
              setPeople(people.map(person => person.id === id ? returnedPerson : person))
              setNameInput('')
              setNumberInput('')
            })
            .catch(err => {
              setMessage(`Information of ${newPerson.name} has already been removed from server`)
              setIsError(true)
              setTimeout(() => {
                setMessage('')
              }, 5000)
              setPeople(people.filter(person => person.id !== id))
            })
        }
        break;
      case 'number':
        window.alert(`Number ${numberInput} is already added to phonebook`)
        break;
      case 'name and number':
        window.alert(`Name ${nameInput} and a number ${numberInput} are already added to phonebook`)
        break;
      default:
        pbs.create(newPerson)
          .then(returnedPerson => {
            setPeople(people.concat(returnedPerson))
            setNameInput('')
            setNumberInput('')
            setMessage(`Added ${returnedPerson.name}`)
            setIsError(false)
            setTimeout(() => {
              setMessage('')
            }, 5000)
          })
          .catch(error => {
            setMessage(error.response.data.error)
            setIsError(true)
            setTimeout(() => {
              setMessage('')
            }, 5000)
          });
        break;
    }
  }

  const deletePerson = (id) => {
    const name = people.find(person => person.id === id).name
    if (window.confirm(`Delete ${name} from the phonebook ? `)) {
      pbs.deleteIt(id)
        .then(
          setPeople(people.filter(person => person.id !== id))
        )
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={filterInput} onChange={handleFilterInput} />
      <h3>Add a new number</h3>
      <SubmitPerson
        onSubmit={addPerson}
        newName={nameInput}
        newNumber={numberInput}
        onNameChange={handleNameInput}
        onNumberChange={handleNumberInput}
        message={message}
        isError={isError}
      />
      <h3>Numbers</h3>
      <People people={people} filter={filterInput} onClick={deletePerson} />
      <p><a href="/info" >Information page</a></p>
    </>
  )
}

export default App