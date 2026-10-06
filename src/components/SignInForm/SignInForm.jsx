import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { signIn } from '../../services/authService';

import './SignInForm.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="simple-signin-page">
      <div className="signin-background">
        <img
          src="/images/bunyan-hero.png"
          alt="Modern architecture"
        />
      </div>

      <div className="signin-overlay" />

      <div className="signin-floating-text">
        <span>BUNYAN</span>
        <p>Build. Improve. Connect.</p>
      </div>

      <section className="simple-signin-card">
        <Link to="/" className="simple-signin-logo">
          <img
            src="/bunyan-logo.png"
            alt="BUNYAN"
          />
        </Link>

        <div className="simple-signin-heading">
          <p>Welcome back</p>

          <h1>Sign in</h1>

          <span>
            Continue to your BUNYAN workspace.
          </span>
        </div>

        {message && (
          <p className="simple-signin-message">
            {message}
          </p>
        )}

        <form
          className="simple-signin-form"
          onSubmit={handleSubmit}
        >
          <div className="simple-signin-field">
            <label htmlFor="email">
              Email
            </label>

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

          <div className="simple-signin-field">
            <label htmlFor="password">
              Password
            </label>

            <div className="simple-password">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="simple-signin-submit"
          >
            Sign In
            <span>→</span>
          </button>
        </form>

        <div className="simple-signin-footer">
          <p>
            New to BUNYAN?{' '}
            <Link to="/sign-up">
              Create account
            </Link>
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
          >
            ← Back home
          </button>
        </div>
      </section>
    </main>
  );
};

export default SignInForm;