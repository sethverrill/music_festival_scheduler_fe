import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserItinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user itinerary");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return (
      <section>
        <p>Error: {error}</p>
        <button onClick={() => navigate("/")}>Back to User List</button>
      </section>
    );
  }

  if (!user) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  const schedule = user.attributes.schedule || {};
  const shows = schedule.shows || {};

  return (
    <section>
      <h2>{user.attributes.first_name}'s Itinerary</h2>
      <h3>Schedule</h3>
      <h3>Shows</h3>
      {shows.length > 0 ? (
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <p>
                <strong>Time Slot:</strong> {show.time_slot}
              </p>
              <p>
                <strong>Artist:</strong> {show.artist?.name || "Unknown"}
              </p>
              <p>
                <strong>Venue:</strong> {show.venue?.name || "Unknown"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No shows scheduled.</p>
      )}
      <button onClick={() => navigate("/")}>Back to User List</button>
    </section>
  );
};

export default UserItinerary;
