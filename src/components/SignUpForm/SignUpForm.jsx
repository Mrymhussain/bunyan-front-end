import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import * as authService from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import '../Auth.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConf: '',
  });

  const {
    name,
    email,
    phone,
    password,
    passwordConf,
  } = formData;

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (password !== passwordConf) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const user = await authService.signUp({
        name,
        email,
        phone,
        password,
      });

      setUser(user);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      name &&
      email &&
      password &&
      passwordConf &&
      password === passwordConf
    );
  };

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-header">
          <h1>Create your account</h1>
          <p>Join BUNYAN and start managing your property needs.</p>
        </div>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="passwordConf">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConf"
              name="passwordConf"
              value={passwordConf}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="auth-actions">
            <button
              type="submit"
              className="auth-submit"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="auth-cancel"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/sign-in">Sign in</Link>
        </div>
      </section>
    </main>
  );
};

export default SignUpForm;