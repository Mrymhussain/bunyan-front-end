import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../lib/helpers/jwt-helpers';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    removeToken();
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img
            src="/bunyan-logo.png"
            alt="BUNYAN"
            className="navbar-logo"
          />
        </Link>

        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">
                Dashboard
              </Link>

              <span className="navbar-user">
                Hi, {user.name}
              </span>

              <Link
                to="/"
                className="nav-signout"
                onClick={handleSignOut}
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>

              <Link to="/sign-in" className="nav-link">
                Sign In
              </Link>

              <Link to="/sign-up" className="nav-signup">
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