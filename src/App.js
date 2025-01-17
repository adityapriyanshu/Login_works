// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import HomeMenu from './components/HomeMenu';
import Navbar from './components/Navbar';
import UserProfile from './components/UserOrder';
import MenuSection from './components/MenuSection';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><HomeMenu /><AboutUs/><Footer/></>} />
        <Route path="/menu" element={<><Navbar /><MenuSection/><Footer/></>} />
        <Route path="/register" element={<><Register/></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<><Navbar/><UserProfile /></>} />
      </Routes>
    </Router>
  );
}

export default App;
