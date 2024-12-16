import axios from 'axios';

export const getInverters = async () => {
  const response = await axios.get('http://localhost:3001/inverters/list');
  return response.data;
};

export const getInvertersField = async (
  inverterName: string,
  field: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/inverters/${inverterName}`,
      {
        params: { field },
      }
    );

    console.log(`Inverter ${field}:`, response.data);
    return response.data;
  } catch (error) {
    // Type-safe error handling for AxiosError
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error fetching inverter field:',
        error.response?.data || error.message
      );
    } else {
      console.error(
        'Unexpected error fetching inverter field:',
        (error as Error).message
      );
    }
  }
};
