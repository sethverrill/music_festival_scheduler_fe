import React, { useEffect } from "react";
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
        setUsers(data.data);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <body>
      <header>
        <h1>Music Festive Scheduler</h1>
        <h2>Admin Panel</h2>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<UserIndex />} />
          <Route path="/user/:id" element={<UserItinerary />} />
        </Routes>
      </section>
    </body>
  )
}

export default App;
