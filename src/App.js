// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ViewUsers from './components/ViewUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        // user logged 
        <Route path="/view-users" element={<ViewUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
