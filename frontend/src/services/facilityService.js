import axios from 'axios';

const API_URL = '/api/facilities';

const getAllFacilities = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getFacilityById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllFacilities, getFacilityById }; 