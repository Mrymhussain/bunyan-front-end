import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../lib/helpers/jwt-helpers';

import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    removeToken();
    setUser(null);
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <img
            src="/bunyan-logo.png"
            alt="BUNYAN"
          />
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div
          className={
            menuOpen
              ? 'navbar-links navbar-links-open'
              : 'navbar-links'
          }
        >
          {user ? (
            <>
              <Link to="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/projects" onClick={closeMenu}>
                Projects
              </Link>

              <Link to="/professionals" onClick={closeMenu}>
                Professionals
              </Link>

              <Link to="/services" onClick={closeMenu}>
                Services
              </Link>

              <Link to="/materials" onClick={closeMenu}>
                Materials
              </Link>

              <Link to="/orders" onClick={closeMenu}>
                Orders
              </Link>

              <Link to="/reviews" onClick={closeMenu}>
                Reviews
              </Link>

              <Link
                to="/profile"
                className="profile-link"
                onClick={closeMenu}
              >
                {user.name}
              </Link>

              <button
                type="button"
                className="sign-out-button"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>

              <Link to="/sign-in" onClick={closeMenu}>
                Sign In
              </Link>

              <Link
                to="/sign-up"
                className="sign-up-link"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;