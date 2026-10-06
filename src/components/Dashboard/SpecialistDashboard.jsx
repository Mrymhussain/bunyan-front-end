import { Link } from 'react-router';

const SpecialistDashboard = ({ user }) => {
  return (
    <main className="role-dashboard">
      <section className="role-dashboard-header">
        <div>
          <p className="dashboard-role-label">
            Specialist Workspace
          </p>

          <h1>Welcome back, {user.name}</h1>

          <p className="dashboard-specialty">
            {user.specialty || 'Specialist'}
          </p>

          <p>
            Manage service requests and your professional profile.
          </p>
        </div>
      </section>

      <section className="role-dashboard-grid">
        <Link to="/service-requests" className="role-card">
          <span>01</span>
          <h2>Service Requests</h2>
          <p>
            View and manage specialist job requests.
          </p>
          <strong>View Requests →</strong>
        </Link>

        <Link to="/reviews" className="role-card">
          <span>02</span>
          <h2>Reviews</h2>
          <p>
            View feedback from clients.
          </p>
          <strong>View Reviews →</strong>
        </Link>

        <Link to="/profile" className="role-card">
          <span>03</span>
          <h2>My Profile</h2>
          <p>
            Manage your information and specialty.
          </p>
          <strong>View Profile →</strong>
        </Link>
      </section>
    </main>
  );
};

export default SpecialistDashboard;