import { Link } from 'react-router';

const AdminDashboard = ({ user }) => {
  return (
    <main className="role-dashboard">
      <section className="role-dashboard-header admin-header">
        <div>
          <p className="dashboard-role-label">
            Administration
          </p>

          <h1>Welcome back, {user.name}</h1>

          <p>
            Manage and review activity across the BUNYAN platform.
          </p>
        </div>
      </section>

      <section className="role-dashboard-grid admin-grid">
        <Link to="/projects" className="role-card">
          <span>01</span>
          <h2>Projects</h2>
          <p>Review projects across the platform.</p>
          <strong>View Projects →</strong>
        </Link>

        <Link to="/consultations" className="role-card">
          <span>02</span>
          <h2>Consultations</h2>
          <p>Review consultation activity.</p>
          <strong>View Consultations →</strong>
        </Link>

        <Link to="/service-requests" className="role-card">
          <span>03</span>
          <h2>Service Requests</h2>
          <p>Review specialist service requests.</p>
          <strong>View Requests →</strong>
        </Link>

        <Link to="/materials" className="role-card">
          <span>04</span>
          <h2>Materials</h2>
          <p>Review marketplace materials.</p>
          <strong>View Materials →</strong>
        </Link>

        <Link to="/orders" className="role-card">
          <span>05</span>
          <h2>Orders</h2>
          <p>Review platform orders.</p>
          <strong>View Orders →</strong>
        </Link>

        <Link to="/reviews" className="role-card">
          <span>06</span>
          <h2>Reviews</h2>
          <p>Review feedback across BUNYAN.</p>
          <strong>View Reviews →</strong>
        </Link>
      </section>
    </main>
  );
};

export default AdminDashboard;