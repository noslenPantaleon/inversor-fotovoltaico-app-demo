import axios from 'axios';

export const getInverters = async () => {
  const response = await axios.get('http://localhost:3001/inverters/list');
  return response.data;
};
