import { Link } from 'react-router';

const EngineerDashboard = ({ user }) => {
  return (
    <main className="role-dashboard">
      <section className="role-dashboard-header">
        <div>
          <p className="dashboard-role-label">
            Engineer Workspace
          </p>

          <h1>Welcome back, {user.name}</h1>

          <p className="dashboard-specialty">
            {user.specialty || 'Engineer'}
          </p>

          <p>
            Manage assigned projects and consultation requests.
          </p>
        </div>
      </section>

      <section className="role-dashboard-grid engineer-grid">
        <Link to="/projects" className="role-card">
          <span>01</span>
          <h2>Projects</h2>
          <p>
            View projects and engineering work.
          </p>
          <strong>View Projects →</strong>
        </Link>

        <Link to="/consultations" className="role-card">
          <span>02</span>
          <h2>Consultations</h2>
          <p>
            Review consultation requests from clients.
          </p>
          <strong>View Consultations →</strong>
        </Link>

        <Link to="/reviews" className="role-card">
          <span>03</span>
          <h2>Reviews</h2>
          <p>
            View reviews and client feedback.
          </p>
          <strong>View Reviews →</strong>
        </Link>

        <Link to="/profile" className="role-card">
          <span>04</span>
          <h2>My Profile</h2>
          <p>
            Manage your professional information.
          </p>
          <strong>View Profile →</strong>
        </Link>
      </section>
    </main>
  );
};

export default EngineerDashboard;