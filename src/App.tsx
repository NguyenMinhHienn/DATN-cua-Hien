import './App.css';
import { useRoutes } from 'react-router-dom';
import ClientLayout from './layout/client';
import AdminLayout from './layout/admin';
import HomePage from './pages/client/home';
import Category from './pages/client/category';
import DetailProduct from './pages/client/detailProduct';
import Login from './pages/client/login';
import NotFound from './pages/client/notFound';
import ProductClient from './pages/client/product';
import CartClient from './pages/client/cart';
import Register from './pages/client/register';
import BlogC from './pages/client/blog';
import ContactC from './pages/client/contact';
import AddP from './pages/admin/product/add';
import EditP from './pages/admin/product/edit';
import ListP from './pages/admin/product/list';
import ListDanhMuc from './pages/admin/category/listDanhMuc';
import AddDanhMuc from './pages/admin/category/addDanhMuc';
import EditDanhMuc from './pages/admin/category/editDanhMuc';
import SearchPage from './pages/client/search';
import PrivateRoute from './components/PrivateRoute';
import Revenue from "./pages/admin/Revenue";
import OrderStatistics from "./pages/admin/OrderStatistics";

function App() {
  const routes = useRoutes([
    {
      path: '',
      element: <ClientLayout />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: 'product',
          element: <ProductClient />,
        },
        {
          path: 'blog',
          element: <BlogC />,
        },
        {
          path: 'contact',
          element: <ContactC />,
        },
        {
          path: 'cart',
          element: <CartClient />,
        },
        {
          path: 'cart/:id',
          element: <CartClient />,
        },
        {
          path: 'category',
          element: <Category />,
        },
        {
          path: 'category/:name', // Route động cho danh mục
          element: <Category />,
        },
        {
          path: 'detail/:id', // Route động cho chi tiết sản phẩm
          element: <DetailProduct />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'search', // Route cho trang tìm kiếm
          element: <SearchPage />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
    {
      path: '/admin',
      element: (
        <PrivateRoute role="admin">
          <AdminLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: 'add',
          element: <AddP />,
        },
        {
          path: 'edit/:id',
          element: <EditP />,
        },
        {
          path: 'list',
          element: <ListP />,
        },
        {
          path: 'listDanhMuc',
          element: <ListDanhMuc />,
        },
        {
          path: 'addDanhMuc',
          element: <AddDanhMuc />,
        },
        {
          path: 'editDanhMuc/:id',
          element: <EditDanhMuc />,
        },
        {
          path: 'revenue',
          element: <Revenue />,
        },
        {
          path: 'order-statistics',
          element: <OrderStatistics />,
        },
      ],
    },
  ]);

  return routes;
}

export default App;
