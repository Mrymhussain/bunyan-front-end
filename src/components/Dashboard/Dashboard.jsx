import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            BUNYAN Workspace
          </p>

          <h1>
            Welcome back, {user?.name}
          </h1>

          <p>
            Manage your projects, consultations,
            services, materials, and orders from one place.
          </p>
        </div>

        <Link
          to="/profile"
          className="dashboard-profile"
        >
          <div className="dashboard-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{user?.name}</strong>
            <span>{user?.role}</span>
          </div>
        </Link>
      </section>

      <section className="dashboard-cards">
        <Link
          to="/projects"
          className="dashboard-card"
        >
          <div className="dashboard-card-top">
            <span>01</span>
            <div className="dashboard-card-icon">
              P
            </div>
          </div>

          <div>
            <h2>Projects</h2>

            <p>
              Create, manage, and follow your
              engineering projects.
            </p>
          </div>

          <strong className="dashboard-card-link">
            View Projects →
          </strong>
        </Link>

        <Link
          to="/consultations"
          className="dashboard-card"
        >
          <div className="dashboard-card-top">
            <span>02</span>
            <div className="dashboard-card-icon">
              C
            </div>
          </div>

          <div>
            <h2>Consultations</h2>

            <p>
              Keep track of your engineering
              consultation requests.
            </p>
          </div>

          <strong className="dashboard-card-link">
            View Consultations →
          </strong>
        </Link>

        <Link
          to="/service-requests"
          className="dashboard-card"
        >
          <div className="dashboard-card-top">
            <span>03</span>
            <div className="dashboard-card-icon">
              S
            </div>
          </div>

          <div>
            <h2>Service Requests</h2>

            <p>
              Follow specialist requests and
              property services.
            </p>
          </div>

          <strong className="dashboard-card-link">
            View Requests →
          </strong>
        </Link>

        <Link
          to="/orders"
          className="dashboard-card"
        >
          <div className="dashboard-card-top">
            <span>04</span>
            <div className="dashboard-card-icon">
              O
            </div>
          </div>

          <div>
            <h2>Orders</h2>

            <p>
              Track building material orders
              and their current status.
            </p>
          </div>

          <strong className="dashboard-card-link">
            View Orders →
          </strong>
        </Link>
      </section>

      <section className="dashboard-content">
        <div className="quick-actions">
          <div className="dashboard-section-heading">
            <div>
              <p>Get started</p>
              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="quick-action-list">
            <Link to="/projects/new">
              <span>01</span>

              <div>
                <strong>Start a Project</strong>
                <p>Create a new engineering project.</p>
              </div>

              <b>→</b>
            </Link>

            <Link to="/professionals">
              <span>02</span>

              <div>
                <strong>Find an Engineer</strong>
                <p>Browse available professionals.</p>
              </div>

              <b>→</b>
            </Link>

            <Link to="/services">
              <span>03</span>

              <div>
                <strong>Request a Service</strong>
                <p>Find specialists for smaller jobs.</p>
              </div>

              <b>→</b>
            </Link>

            <Link to="/materials">
              <span>04</span>

              <div>
                <strong>Browse Materials</strong>
                <p>Find materials from suppliers.</p>
              </div>

              <b>→</b>
            </Link>
          </div>
        </div>

        <aside className="dashboard-side-card">
          <p className="dashboard-side-label">
            Your workspace
          </p>

          <h2>
            Everything connected through BUNYAN.
          </h2>

          <p>
            Keep your property journey organized
            without switching between different
            people, services, and suppliers.
          </p>

          <div className="dashboard-side-divider" />

          <Link to="/reviews">
            My Reviews →
          </Link>

          <Link to="/profile">
            My Profile →
          </Link>
        </aside>
      </section>
    </main>
  );
};

export default Dashboard;