import { useLoaderData } from 'react-router-dom';
import Product from '../components/Product/Index';

const ProductDetails = () => {
  const data = useLoaderData();

  return <Product data={data} />;
};

export default ProductDetails;
