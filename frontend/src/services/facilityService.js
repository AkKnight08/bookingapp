import axios from 'axios';
import { API_URL } from '../config/api';

const FACILITIES_URL = `${API_URL}/api/facilities`;

const getAllFacilities = async () => {
  try {
    const response = await axios.get(FACILITIES_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getFacilityById = async (id) => {
  try {
    const response = await axios.get(`${FACILITIES_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllFacilities, getFacilityById }; 