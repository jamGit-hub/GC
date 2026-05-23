
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import OrderHistory from './pages/OrderHistory';
import PProducts from './pages/PProducts'
function App() {
  return (
    <BrowserRouter>
    <Navbar /> 
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Admin_Dashboard" element={<AdminDashboard />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/platform/:name" element={<PProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
