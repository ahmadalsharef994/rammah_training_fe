import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;


const UniversitiesList = () => {
  const [universities, setUniversities] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentUniversity, setCurrentUniversity] = useState({ id: null, name: '', location: '', fees: '', numberOfStudents: '' });

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    const response = await axios.get(`${API_URL}/universities`);
    setUniversities(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/universities/${id}`);
    fetchUniversities();
  };

  const handleEditClick = (university) => {
    setEditing(true);
    setCurrentUniversity(university);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUniversity({ ...currentUniversity, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editing) {
      await axios.put(`${API_URL}/universities/${currentUniversity.id}`, currentUniversity);
    } else {
      await axios.post(`${API_URL}/universities`, currentUniversity);
    }
    setEditing(false);
    setCurrentUniversity({ id: null, name: '', location: '', fees: '', numberOfStudents: '' });
    fetchUniversities();
  };

  return (
    <div>
      <h2>Universities</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={currentUniversity.name} onChange={handleInputChange} />
          <label>Location:</label>
          <input type="text" name="location" value={currentUniversity.location} onChange={handleInputChange} />
          <label>Fees:</label>
          <input type="number" name="fees" value={currentUniversity.fees} onChange={handleInputChange} />
          <label>Number of Students:</label>
          <input type="number" name="numberOfStudents" value={currentUniversity.numberOfStudents} onChange={handleInputChange} />
          <button>Submit</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <button onClick={() => handleEditClick({ id: null, name: '', location: '', fees: '', numberOfStudents: '' })}>Add New University</button>
          <ul>
            {universities.map((university) => (
              <li key={university.id}>
                {university.name} - {university.location} - {university.fees} - {university.numberOfStudents}
                <button onClick={() => handleEditClick(university)}>Edit</button>
                <button onClick={() => handleDelete(university.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UniversitiesList;
