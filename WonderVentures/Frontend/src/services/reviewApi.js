import axios from 'axios';
import { URL_REVIEW } from '../utils/constants';

export const getReview = async () => {
  try {
    const res = await axios.get(`${URL_REVIEW}`);
    if (res.status !== 200) throw new Error('Something went wrong');
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};


export const addData = async (method, body) => {
  try {

    let response;
    switch (method.toUpperCase()) {
      case 'POST':
        response = await axios.post(`${URL_REVIEW}`, body);
        break;
      case 'PUT':
        response = await axios.put(`${URL_REVIEW}}`, body);
        break;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};







