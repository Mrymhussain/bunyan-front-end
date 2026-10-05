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
        Manage your BUNYAN activity from your dashboard.
      </p>

      <section>
        <h2>My Activity</h2>

        <div>
          <Link to="/projects">My Projects</Link>
          <br />

          <Link to="/consultations">Consultations</Link>
          <br />

          <Link to="/service-requests">Service Requests</Link>
          <br />

          <Link to="/orders">Orders</Link>
        </div>
      </section>

      <section>
        <h2>Quick Actions</h2>

        <div>
          <Link to="/projects/new">Create New Project</Link>
          <br />

          <Link to="/professionals">Find Professionals</Link>
          <br />

          <Link to="/services">Request a Service</Link>
          <br />

          <Link to="/materials">Browse Materials</Link>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;