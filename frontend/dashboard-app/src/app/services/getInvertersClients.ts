import axios from 'axios';

export const getInvertersClients = async () => {
  const response = await axios.get('http://localhost:3001/connections');
  return response.data;
};
