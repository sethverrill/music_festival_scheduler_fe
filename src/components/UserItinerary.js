import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './UserItinerary.css';


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
      <section role="alert">
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
  const getTimeSlot = (timeSlot) => {
    const timeSlots = {
      1: "4:00 PM - 4:45 PM",
      2: "5:00 PM - 5:45 PM",
      3: "6:00 PM - 6:45 PM",
      4: "7:00 PM - 7:45 PM",
      5: "8:00 PM - 8:45 PM",
      6: "9:00 PM - 9:45 PM",
      7: "10:00 PM - 10:45 PM",
      8: "11:00 PM - 11:45 PM"
    };

    return timeSlots[timeSlot] || "Unknown Time Slot";
  };

  return (
    <section aria-labelledby="itinerary">
      <h2 id="itinerary">{user.attributes.first_name}'s Itinerary</h2>
      <h3>Schedule</h3>
      <h3>Shows</h3>
      {shows.length > 0 ? (
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <p>
                <strong>Time Slot:</strong> {getTimeSlot(show.time_slot)}
              </p>
              <p>
                <strong>Artist:</strong> {show.artist?.name}
              </p>
              <p>
                <strong>Venue:</strong> {show.venue?.name}
              </p>
              <button
                onClick={() => {
                  fetch(`http://localhost:3000/api/v1/shows/${show.id}`, {
                    method: "DELETE",
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Failed to delete show");
                      }
                      setUser((prevUser) => {
                        const updatedShows = prevUser.attributes.schedule.shows.filter(
                          (sho) => sho.id !== show.id
                        );
                        return {
                          ...prevUser,
                          attributes: {
                            ...prevUser.attributes,
                            schedule: {
                              ...prevUser.attributes.schedule,
                              shows: updatedShows,
                            },
                          },
                        };
                      });
                    })
                    .catch((error) => console.error("Error deleting show:", error))
                }}
              >
              Delete
              </button>
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
