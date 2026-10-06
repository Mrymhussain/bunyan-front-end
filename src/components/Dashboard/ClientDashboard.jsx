import { Link } from 'react-router';

const ClientDashboard = ({ user }) => {
  return (
    <main className="role-dashboard">
      <section className="role-dashboard-header">
        <div>
          <p className="dashboard-role-label">
            Client Workspace
          </p>

          <h1>Welcome back, {user.name}</h1>

          <p>
            Manage your property projects, requests,
            consultations, and orders.
          </p>
        </div>
      </section>

      <section className="role-dashboard-grid">
        <Link to="/projects" className="role-card">
          <span>01</span>
          <h2>My Projects</h2>
          <p>View and manage your engineering projects.</p>
          <strong>View Projects →</strong>
        </Link>

        <Link to="/consultations" className="role-card">
          <span>02</span>
          <h2>Consultations</h2>
          <p>Track your engineering consultations.</p>
          <strong>View Consultations →</strong>
        </Link>

        <Link to="/service-requests" className="role-card">
          <span>03</span>
          <h2>Service Requests</h2>
          <p>Follow requests made to specialists.</p>
          <strong>View Requests →</strong>
        </Link>

        <Link to="/orders" className="role-card">
          <span>04</span>
          <h2>Orders</h2>
          <p>Track your building material orders.</p>
          <strong>View Orders →</strong>
        </Link>
      </section>

      <section className="dashboard-quick-section">
        <p className="dashboard-role-label">
          Quick Actions
        </p>

        <h2>What would you like to do?</h2>

        <div className="dashboard-quick-links">
          <Link to="/projects/new">
            Start a Project →
          </Link>

          <Link to="/professionals">
            Find an Engineer →
          </Link>

          <Link to="/services">
            Request a Service →
          </Link>

          <Link to="/materials">
            Browse Materials →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ClientDashboard;