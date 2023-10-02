import axios from 'axios';
import { URL, URL_IMAGES, URL_PRODUCTS, URL_PRODUCTS_NAME } from '../utils/constants';

export const fetchPagProducts = async (limit, page) => {
  try {
    const res = await axios.get(
      `${URL_PRODUCTS}/all?limit=${limit}&page=${page}`
    );
    if (res.status !== 200) throw new Error('Something went wrong');
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${URL_PRODUCTS}/all`);
    if (res.status !== 200) throw new Error('Something went wrong');
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchProductsName = async (name, startDate, endDate) => {
  try {
    const res = await axios.get(`${URL_PRODUCTS_NAME}${name}/${startDate}/${endDate}`);
    if (res.status !== 200) throw new Error('Something went wrong');
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const addData = async (method, body, endpoint) => {
  try {

    switch (method.toUpperCase()) {
      case 'POST':
        await axios.post(`${URL_PRODUCTS}/${endpoint}`, body);
        break;
      case 'PUT':
        await axios.put(`${URL_PRODUCTS}/${endpoint}`, body);
        break;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchProduct = async ({ params }) => {
  const id = params.productId;
  const response = await fetch(`${URL_PRODUCTS}/${id}`);
  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: `Could not fetch product details for id:${id}`,
      }),
      { status: 500 }
    );
  } else {
    return response;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${URL_PRODUCTS}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Response(
        JSON.stringify({
          message: `Could not delete product with id:${id}`,
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getIcons = async () => {
  try {
    const res = await axios.get(`${URL_IMAGES}/icons`);
    if (res.status !== 200) throw new Error('Something went wrong');
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getCategories = async() => {
  try {
    const res = await axios.get(`${URL}/category/all`);
    if (res.status !== 200) throw new Error('Something went wrong');
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
}

export const deleteImage = async (id) => {
  try {
    const response = await fetch(`${URL_IMAGES}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Response(
        JSON.stringify({
          message: `Could not delete image with id:${id}`,
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};


