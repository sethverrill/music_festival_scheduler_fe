import React from "react";
import { Routes, Route } from 'react-router-dom';
import UserIndex from './components/UserIndex';
import UserItinerary from './components/UserItinerary';

function App() {
  return (
    <body>
      <header>
        <h1>Music Festive Scheduler</h1>
        <h2>Admin Panel</h2>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<UserIndex />} />
          <Route path="/user/:id" element={UserItinerary />} />
        </Routes>
      </section>
    </body>
  )
}

export default App;
