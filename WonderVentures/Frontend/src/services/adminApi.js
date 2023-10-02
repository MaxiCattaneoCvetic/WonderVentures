import axios from 'axios';
import { URL_USER, USR_USER_UPDATE } from '../utils/constants';


export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${URL_USER}`);
    if (res.status !== 200) throw new Error('Something went wrong');
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const updateUser = async (updatedUserData) => {
  try {
    const res = await axios.put(USR_USER_UPDATE, updatedUserData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      throw new Error('Something went wrong');
    }

    return res.data;
  } catch (error) {
    console.error(error.message);
    throw error; 
  }
};

