import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { getAllUsers } from '../services/userService';

const UserListingPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UserListingPage;