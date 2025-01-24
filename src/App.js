import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/common/Login';
import HomeMenu from './components/HomeMenu';
import Navbar from './components/common/Navbar';
import MyOrders from './components/MyOrders';
import MenuSection from './components/MenuSection';
import AboutUs from './components/AboutUs';
import Footer from './components/common/Footer';
import Register from './components/common/Register';
import AllOrders from './components/AllOrders';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><HomeMenu /><AboutUs/><Footer/></>} />
        <Route path="/menu" element={<><Navbar /><MenuSection/><Footer/></>} />
        <Route path="/register" element={<><Register/></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-orders" element={<><Navbar/><MyOrders /></>} />
        <Route path="/all-orders" element={<><Navbar/><AllOrders/></>} />
        <Route path="/admin" element={<><Navbar/><Admin/></>} />
      </Routes>
    </Router>
  );
}

export default App;
