import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import * as authService from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      navigate('/dashboard');
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
    <main className="simple-signup-page">
      <div className="signup-background">
        <img
          src="/images/bunyan-interior.png"
          alt="Modern interior"
        />
      </div>

      <div className="signup-overlay" />

      <section className="simple-signup-card">
        <Link to="/" className="simple-signup-logo">
          <img
            src="/bunyan-logo.png"
            alt="BUNYAN"
          />
        </Link>

        <div className="simple-signup-heading">
          <p>Join BUNYAN</p>

          <h1>Create account</h1>

          <span>
            Start managing your property journey in one place.
          </span>
        </div>

        {message && (
          <p className="simple-signup-message">
            {message}
          </p>
        )}

        <form
          className="simple-signup-form"
          onSubmit={handleSubmit}
        >
          <div className="signup-two-columns">
            <div className="simple-signup-field">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="simple-signup-field">
              <label htmlFor="phone">
                Phone
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
          </div>

          <div className="simple-signup-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="signup-two-columns">
            <div className="simple-signup-field">
              <label htmlFor="password">
                Password
              </label>

              <div className="signup-password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="simple-signup-field">
              <label htmlFor="passwordConf">
                Confirm Password
              </label>

              <div className="signup-password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="passwordConf"
                  name="passwordConf"
                  value={passwordConf}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="signup-show-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide passwords' : 'Show passwords'}
          </button>

          <button
            type="submit"
            className="simple-signup-submit"
            disabled={isFormInvalid()}
          >
            Create Account
            <span>→</span>
          </button>
        </form>

        <div className="simple-signup-footer">
          <p>
            Already have an account?{' '}
            <Link to="/sign-in">
              Sign in
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

export default SignUpForm;