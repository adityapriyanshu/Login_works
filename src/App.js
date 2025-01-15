// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import HomeMenu from './components/HomeMenu';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import MenuSection from './components/MenuSection';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><HomeMenu /><AboutUs/><Footer/></>} />
        <Route path="/menu" element={<><Navbar /><MenuSection/></>} />

        <Route path="/login" element={<Login />} />
        // user logged 
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
