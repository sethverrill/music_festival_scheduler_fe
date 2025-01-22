import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import UserIndex from './components/UserIndex';
import UserItinerary from './components/UserItinerary';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.data || []);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <main>
      <header>
        <h1>Music Festival Scheduler</h1>
        <h2>Admin Panel</h2>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<UserIndex users={users} error={error} />} />
          <Route path="/user/:id" element={<UserItinerary />} />
        </Routes>
      </section>
    </main>
  )
}

export default App;
