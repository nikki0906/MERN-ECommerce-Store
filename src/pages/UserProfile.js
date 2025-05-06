// src/pages/UserProfile.js
import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePic: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    console.log('User profile updated:', user);
    // Make an API call to update the user profile
  };

  return (
    <div className="userProfile">
      <h2>User Profile</h2>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="file"
        name="profilePic"
        onChange={handleChange}
        placeholder="Profile Picture"
      />
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default UserProfile;