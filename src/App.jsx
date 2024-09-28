import { useState } from 'react';
import './App.css';
import Header from './Header';
import Hero from './Hero'; // Importera Hero
import { Routes, Route } from 'react-router-dom'; // Lägg till Routes och Route från react-router-dom
import Schedule from './pages/Schedule'; // Importera Schedule-komponenten
import Wedding from './pages/Wedding-party';
import Rsvp from './pages/Rsvp';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} /> {/* Route för startsidan */}
        <Route path="/schedule" element={<Schedule />} /> {/* Route för Schedule-sidan */}
        <Route path="/wedding-party" element={<Wedding />} /> {/* Route för Schedule-sidan */}
        <Route path="/RSVP" element={<Rsvp />} />
      </Routes>
    </div>
  );
}

export default App;