
import React, { useState, useEffect } from 'react';
import personModule from './personModule.js'; 

const Button = ({ text, id, setPersons, persons }) => {
  return (
    <>
      <button onClick={() => personModule.remove({ id, setPersons, persons })}>{text}</button>
    </>
  );
}


const Filter = ({filter, setFilter}) => {
  return(
    <>
      <label>Filter shown with </label>
      <input type='text'
        onChange={(event) => setFilter(event.target.value)}
      />
    </>
  )
}

const PersonForm = ({addName, newName, setNewName, newNumber, setNewNumber}) =>{
  return(
    <form onSubmit={addName}>
    <div>
      <label>name:</label> 
      <input type='text'
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
      <br/>
      <label>number:</label>
      <input type='number'
        value={newNumber}
        onChange={(event) => setNewNumber(event.target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
} 

const Persons = ({persons, filteredPersons, setPersons}) => {
  return(
    <ul>
    {filteredPersons.map((person) => (
      <div key={person.id}>
        <li key={person.id}>{person.name} {person.number}</li> <Button text="delete" id={person.id} setPersons={setPersons} persons={persons}/>
      </div>
    ))}
  </ul>    
  )
}

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personModule.getAll()
      .then(data => setPersons(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const showMessage = (text, isError) => {
    setMessage(text);
    setIsError(isError);
    setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 5000); 
  };

  const addName = (event) => {
    event.preventDefault();
    const newId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 1;
    const newPerson = { name: newName, number: newNumber, id: newId };
    const existingPerson = persons.find(person => person.name === newPerson.name);
    if (existingPerson) {
      const boolChangeNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (boolChangeNumber) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personModule.update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id === existingPerson.id ? response : person));
            setNewName('');
            setNewNumber('');
            showMessage(`Updated ${response.name}'s number.`, false);
          })
          .catch(error => {
            console.error('Error updating person:', error);
            showMessage('Error updating person. Please try again.', true);
          });
      } else {
        console.log("The phone number was not updated")
      }
    } else {
      personModule.create({ newPerson })
        .then(response => {
          setPersons([...persons, response]);
          setNewName('');
          setNewNumber('');
          console.log(response.newPerson.name)
          showMessage(`Added ${response.newPerson.name}.`, false)
        })
        .catch(error => {
          console.error('Error adding person:', error);
          showMessage('Error adding person. Please try again.', true)
        });
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <div className={isError ? 'error' : 'success'}>{message}</div>}
      <br></br>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add new</h3>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filteredPersons={filteredPersons} setPersons={setPersons}/>
    </div>
  );
}

export default App;
