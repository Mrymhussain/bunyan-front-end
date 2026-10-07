import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import './Profile.css';

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const initial = user.name
    ? user.name.charAt(0).toUpperCase()
    : 'U';

  return (
    <main className="profile-page">
      <section className="profile-header">
        <p className="profile-label">
          BUNYAN Account
        </p>

        <h1>My Profile</h1>

        <p>
          View your account information and manage your personal details.
        </p>
      </section>

      <section className="profile-layout">
        <div className="profile-card">
          <div className="profile-identity">
            <div className="profile-avatar">
              {user.image_url ? (
                <img
                  src={user.image_url}
                  alt={user.name}
                />
              ) : (
                initial
              )}
            </div>

            <div>
              <p className="profile-role">
                {user.role}
              </p>

              <h2>{user.name}</h2>

              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-card">
              <span>Full Name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="profile-info-card">
              <span>Email Address</span>
              <strong>{user.email}</strong>
            </div>

            <div className="profile-info-card">
              <span>Phone Number</span>
              <strong>
                {user.phone || 'Not specified'}
              </strong>
            </div>

            <div className="profile-info-card">
              <span>Account Role</span>
              <strong>{user.role}</strong>
            </div>

            {user.specialty && (
              <div className="profile-info-card profile-specialty-card">
                <span>Specialty</span>
                <strong>{user.specialty}</strong>
              </div>
            )}
          </div>
        </div>

        <aside className="profile-sidebar">
          <div className="profile-sidebar-card">
            <p>Account Settings</p>

            <h3>Keep your profile up to date</h3>

            <span>
              Make sure your contact information
              is accurate across BUNYAN.
            </span>

            <Link
              to="/profile/edit"
              className="profile-edit-button"
            >
              Edit Profile
              <span>→</span>
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Profile;
