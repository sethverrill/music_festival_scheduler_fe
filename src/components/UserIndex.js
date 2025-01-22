import React from "react"; 
import { Link } from "react-router-dom"

const UserIndex = ({ users, error }) => {
  if (error) {
    return <section><p>Error: {error}</p></section>;
  }

  return (
    <section aria-labelledby="user-list">
      <h3 id="user-list">Ticketed Users:</h3>
      <ul>
        {users.map((user)=> (
          <li key={user.id}>
            <Link to={`/user/${user.attributes.id}`} aria-label={`View itinerary for ${user.attributes.first_name}`}>
              {user.attributes.first_name} {user.attributes.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserIndex;
