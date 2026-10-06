import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { updateUser } from '../../services/userService';

import './EditProfile.css';

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialty: user?.specialty || '',
  });

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const updatedUser = await updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialty: formData.specialty,
        role: user.role,
      });

      setUser(updatedUser);
      navigate('/profile');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="edit-profile-page">
      <section className="edit-profile-header">
        <p className="edit-profile-label">
          Account Settings
        </p>

        <h1>Edit Profile</h1>

        <p>
          Update your personal information and keep your BUNYAN profile current.
        </p>
      </section>

      <section className="edit-profile-card">
        {message && (
          <p className="edit-profile-message">
            {message}
          </p>
        )}

        <form
          className="edit-profile-form"
          onSubmit={handleSubmit}
        >
          <div className="edit-profile-row">
            <div className="edit-profile-field">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-profile-field">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="edit-profile-row">
            <div className="edit-profile-field">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            {user?.role !== 'client' && (
              <div className="edit-profile-field">
                <label htmlFor="specialty">
                  Specialty
                </label>

                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="Example: Civil Engineer"
                />
              </div>
            )}
          </div>

          <div className="edit-profile-role">
            <span>Account Role</span>
            <strong>{user?.role}</strong>
          </div>

          <div className="edit-profile-actions">
            <button
              type="submit"
              className="edit-profile-submit"
            >
              Save Changes
              <span>→</span>
            </button>

            <button
              type="button"
              className="edit-profile-cancel"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditProfile;
