import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layouts/Layout/Layout'
import Home from './Pages/Home/Home'
import {HeroUIProvider} from "@heroui/react";
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Categories from './Pages/Categories/Categories';
import Brands from './Pages/Brands/Brands';
import Cart from './Pages/Cart/Cart';
import Notfound from './Pages/Notfound/Notfound';
import ProtectedRoute from './Auth/ProtectedRoute';
import CounterContextProvider from './Contexts/CounterContext';
import AuthContextProvider from './Contexts/AuthContext';
import ProtectedAuthRoute from './Auth/ProtectedAuthRoute';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adress from './Pages/Adress/Adress';
import Orders from './Pages/Orders/Orders';

const router=createBrowserRouter([
  {
     path: '',element:<Layout />,
    children: [
   { index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
   { path:'login',element:<ProtectedAuthRoute><Login /></ProtectedAuthRoute>},
   { path:'register',element:<ProtectedAuthRoute><Register /></ProtectedAuthRoute>},
   { path:'categories',element:<ProtectedRoute><Categories /></ProtectedRoute>},
   { path:'brands',element:<ProtectedRoute><Brands /></ProtectedRoute>},
   { path:'product/:id',element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
   { path:'cart',element:<ProtectedRoute><Cart /></ProtectedRoute>},
   { path:'allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
   { path:'adress/:cartId',element:<ProtectedRoute><Adress/></ProtectedRoute>},
   { path:'*',element:<Notfound />},


  ]
}
])
function App() {


  return (
    <>
    <AuthContextProvider> 
      <CounterContextProvider>
        <HeroUIProvider>
          <RouterProvider router={router}>
          <ToastContainer/>
          </RouterProvider>
        
        </HeroUIProvider>
    </CounterContextProvider>
    </AuthContextProvider>
   
     
    </>
  )
}

export default App
