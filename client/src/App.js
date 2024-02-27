import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [newPhone, setNewPhone] = useState(0);
  const [phonebook, setPhonebook] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:8080/get-phone');
      setPhonebook(response.data.data.phoneNumbers);
    } catch (error) {
      console.error('Error fetching phonebook:', error);
    }
  };

  const addNewNumber = async () => {
    try {
      await Axios.post('http://localhost:8080/add-phone', { name, phone });
      fetchData();
    } catch (error) {
      console.error('Error adding new number:', error);
    }
  };

  const updatePhone = async (id) => {
    try {
      await Axios.put(`http://localhost:8080/update-phone/${id}`, { newPhone });
      fetchData();
    } catch (error) {
      console.error('Error updating phone:', error);
    }
  };

  const deletePhone = async (id) => {
    try {
      await Axios.delete(`http://localhost:8080/delete-phone/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting phone:', error);
    }
  };

  return (
    <div className="container">
      <h1>PhoneBook List</h1>

      {/* Add New Number Form */}
      <label htmlFor="">Name: </label>
      <input type="text" onChange={(e) => setName(e.target.value)} /><br /><br />
      <label htmlFor="">Phone: </label>
      <input type="number" onChange={(e) => setPhone(e.target.value)} /><br /><br />
      <button onClick={addNewNumber}>Add New Number</button>

      {/* Display PhoneBook List with Update and Delete Functionality */}
      {phonebook.map((val, key) => (
        <div key={key} className="phone">
          <h1>{val.name}</h1>
          <h1>{val.phone}</h1>
          <input
            type="number"
            placeholder="Update Phone..."
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <button className="update-btn" onClick={() => updatePhone(val._id)}>
            Update
          </button>
          <button className="delete-btn" onClick={() => deletePhone(val._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
