import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ChatInterface from './components/ChatInterface';
import HomePage from './components/HomePage';  // Correct import path

import AboutPage from './components/AboutPage';  // Correct import path


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </Router>
  );
}

export default App;
