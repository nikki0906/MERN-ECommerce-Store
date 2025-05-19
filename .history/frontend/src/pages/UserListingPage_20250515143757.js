import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/userService';
import UserCard from './UserCard';
import './UserListing.css';

const UserListingPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="user-listing-page">
      <h2>All Users</h2>
      <div className="user-grid">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserListingPage;