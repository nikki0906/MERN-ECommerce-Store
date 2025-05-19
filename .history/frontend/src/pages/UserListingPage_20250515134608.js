import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/userService';
import UserCard from './UserCard';
import './UserListing.css';

const UserListingPage = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchAllUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div className="user-listing-page">
      <h2>User Listings</h2>
      <div className="user-grid">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserListingPage;