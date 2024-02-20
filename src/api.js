import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUniversities = async () => {
  return await axios.get(`${API_URL}/universities`);
};

export const createUniversity = async (data) => {
  return await axios.post(`${API_URL}/universities`, data);
};

export const updateUniversity = async (id, data) => {
  return await axios.put(`${API_URL}/universities/${id}`, data);
};

export const deleteUniversity = async (id) => {
  return await axios.delete(`${API_URL}/universities/${id}`);
};
