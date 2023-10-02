import { useLoaderData } from 'react-router-dom';
import ProductImages from '../components/ProductImages/Index';

const ImageGallery = () => {
  const data = useLoaderData();

  return <ProductImages data={data} />;
};

export default ImageGallery;
