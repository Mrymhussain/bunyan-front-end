import { Link } from 'react-router';

const SupplierDashboard = ({ user }) => {
  return (
    <main className="role-dashboard">
      <section className="role-dashboard-header">
        <div>
          <p className="dashboard-role-label">
            Supplier Workspace
          </p>

          <h1>Welcome back, {user.name}</h1>

          <p>
            Manage your materials and customer orders.
          </p>
        </div>
      </section>

      <section className="role-dashboard-grid">
        <Link to="/materials" className="role-card">
          <span>01</span>
          <h2>My Materials</h2>
          <p>
            View and manage building materials.
          </p>
          <strong>View Materials →</strong>
        </Link>

        <Link to="/materials/new" className="role-card">
          <span>02</span>
          <h2>Add Material</h2>
          <p>
            Add a new product to the marketplace.
          </p>
          <strong>Add Material →</strong>
        </Link>

        <Link to="/orders" className="role-card">
          <span>03</span>
          <h2>Orders</h2>
          <p>
            View orders placed for your materials.
          </p>
          <strong>View Orders →</strong>
        </Link>

        <Link to="/profile" className="role-card">
          <span>04</span>
          <h2>My Profile</h2>
          <p>
            Manage your supplier account.
          </p>
          <strong>View Profile →</strong>
        </Link>
      </section>
    </main>
  );
};

export default SupplierDashboard;