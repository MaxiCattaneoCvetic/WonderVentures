import { useLoaderData } from 'react-router-dom';
import EditProduct from '../../features/AdminActions/components/EditProduct/Index';

const Edit = () => {
  const data = useLoaderData();

  return <EditProduct data={data} />;
};

export default Edit;
