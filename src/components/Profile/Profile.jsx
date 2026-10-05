import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <main>
      <h1>My Profile</h1>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || 'Not specified'}</p>
      <p>Role: {user.role}</p>

      {user.specialty && (
        <p>Specialty: {user.specialty}</p>
      )}

      <Link to="/profile/edit">
        Edit Profile
      </Link>
    </main>
  );
};

export default Profile;