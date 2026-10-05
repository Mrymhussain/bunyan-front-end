import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { signIn } from '../../services/authService';
import '../Auth.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to continue to BUNYAN.</p>
        </div>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="auth-actions">
            <button
              type="submit"
              className="auth-submit"
            >
              Sign In
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
          Don't have an account?{' '}
          <Link to="/sign-up">Create one</Link>
        </div>
      </section>
    </main>
  );
};

export default SignInForm;