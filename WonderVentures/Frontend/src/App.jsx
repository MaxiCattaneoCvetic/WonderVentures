import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  fetchProducts as productsLoader,
  fetchProduct as productLoader,
} from './services/productApi';
import Admin from './pages/adminPages/Admin';
import Edit from './pages/adminPages/Edit';
import Error from './pages/Error';
import Home from './pages/Home';
import ImageGallery from './pages/ImageGallery';
import ProductDetails from './pages/ProductDetails';
import ProductManagement from './pages/adminPages/ProductManagement';
import RootLayout from './layouts/RootLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManager from "../src/features/AdminActions/components/UserManager/Index"
import WishList from './pages/Wishlist';
import AddCategory from './features/AdminActions/components/FormCategory/AddCategory';
import Bookings from './pages/Bookings';







const router = createBrowserRouter([
  

  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'productDetails/:productId',
        element: <ProductDetails />,
        loader: productLoader,
      },
      {
        path: 'imageGallery/:productId',
        element: <ImageGallery />,
        loader: productLoader,
      },
      {
        path: 'wishlist',
        element: <WishList />,
      },
      {
        path: 'misReservas',
        element: <Bookings />,
      },
      {
        path: 'admin',
        id: 'admin',
        loader: productsLoader,
        children: [
          {
            index: true,
            element: <Admin />,
          },
          {
            path: 'productManagement',
            element: <ProductManagement />,
          },
          {
            path: 'edit/:productId',
            element: <Edit />,
            loader: productLoader,
          },
          {
            path: 'usermanager',
            element: <UserManager/>
            
          },
          {
            path: 'newcategory',
            element: <AddCategory/>
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
