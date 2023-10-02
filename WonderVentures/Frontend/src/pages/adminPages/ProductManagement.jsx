import { useRouteLoaderData } from 'react-router-dom';
import ManageAllProducts from '../../features/AdminActions/components/ManageAllProducts/Index';

const ProductManagement = () => {
  const data = useRouteLoaderData('admin');

  return <ManageAllProducts data={data} />;
};

export default ProductManagement;
