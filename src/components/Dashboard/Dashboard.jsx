import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <main>
      <h1>Welcome, {user.name}</h1>

      <p>
        Manage your projects, consultations, services, materials,
        and orders from your BUNYAN dashboard.
      </p>

      <section>
        <h2>My Activity</h2>

        <div>
          <Link to="/projects">
            My Projects
          </Link>

          <Link to="/consultations">
            Consultations
          </Link>

          <Link to="/service-requests">
            Service Requests
          </Link>

          <Link to="/orders">
            Orders
          </Link>
        </div>
      </section>

      <section>
        <h2>Quick Actions</h2>

        <div>
          <Link to="/projects/new">
            New Project
          </Link>

          <Link to="/professionals">
            Find Professionals
          </Link>

          <Link to="/services">
            Request a Service
          </Link>

          <Link to="/materials">
            Browse Materials
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;