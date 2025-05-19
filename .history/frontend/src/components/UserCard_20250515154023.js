import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-bold text-xl">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-500">{user.role}</p>
    </div>
  );
};

export default UserCard;