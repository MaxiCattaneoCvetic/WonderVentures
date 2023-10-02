import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://3.142.65.68:8080/experience' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/all',
    }),
    getProduct: builder.query({
      query: (productId) => `/${productId}`,
    }),
    getPaginatedProducts: builder.query({
      query: ({ page = 1, limit = 10 }) => `/all?limit=${limit}&page=${page}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetPaginatedProductsQuery,
} = apiSlice;
