import axios from 'axios';

const getAll = () => {
  return axios.get("http://localhost:3001/persons").then(response => response.data);
};

const remove = ({id, setPersons, persons}) => {
    const personName = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${personName.name}?`);
    
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          console.log(`Person with id ${id} deleted successfully.`);
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error(`Error deleting person with id ${id}:`, error);
        });
    }
  }
  
  const create = (newPerson) => {
    return axios.post('http://localhost:3001/persons/', newPerson)
      .then(response => {
        console.log("Persona añadida:", response.data);
        return response.data; // Devolver los datos de la persona creada
      })
      .catch(error => {
        console.error('Error:', error);
        throw error; // Rethrow the error to be caught by the caller
      });
  };

  const update = (id, updatedPerson) => {
    return axios.put(`http://localhost:3001/persons/${id}`, updatedPerson).then(response => response.data);
  };

  export default { getAll, create, remove, update };