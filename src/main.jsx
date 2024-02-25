import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './output.css'
import 'swiper/css';

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


// fonts and icons
import '././assets/css/icofont.min.css';
import '././assets/css/animate.css';
import '././assets/css/style.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import Shop from './pages/Shop/Shop.jsx';
import SingleProduct from './pages/Shop/SingleProduct.jsx';
import Blog from './pages/Blog/Blog.jsx';
import SingleBlog from './pages/Blog/SingleBlog.jsx';
import About from './pages/AboutPage/About.jsx';
import Contact from './pages/ContactPage/Contact.jsx';
import CartPage from './pages/Shop/CartPage.jsx';
import CheckoutPage from './pages/Shop/CheckoutPage.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import App1 from './App1.jsx';
import ForgotPassword from './components/ForgotPasword.jsx';
import Orders from './pages/Shop/Orders.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/shop",
        element: <Shop/>
      },
      {
        path: "shop/:id",
        element: <SingleProduct/>
      },
      {
        path: "/blog",
        element: <Blog/>
      },
      {
        path: "/blog/:id",
        element: <SingleBlog/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/cart-page",
        element: <PrivateRoute><CartPage/></PrivateRoute>
      },
      {
        path: "/orders",
        element: <Orders/>
      },
    ]
  },
  {
    path: "/sign-up",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/forgotpass",
    element: <ForgotPassword/>
  },
  {
    path: "/check-out",
    element: <CheckoutPage/>
  },
  {
    path: "/customize",
    element: <App1/>
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
     <RouterProvider router={router} />
  </AuthProvider>
  
)
