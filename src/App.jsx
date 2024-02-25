import "./App.css";
import { Outlet } from "react-router-dom";
import NavItems from "./components/NavItems";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <NavItems />
      <div className="min-vh-100">
      <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
