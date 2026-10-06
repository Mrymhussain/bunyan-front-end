import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';
import EngineerDashboard from './EngineerDashboard';
import SpecialistDashboard from './SpecialistDashboard';
import SupplierDashboard from './SupplierDashboard';

import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  if (user.role === 'admin') {
    return <AdminDashboard user={user} />;
  }

  if (user.role === 'engineer') {
    return <EngineerDashboard user={user} />;
  }

  if (user.role === 'specialist') {
    return <SpecialistDashboard user={user} />;
  }

  if (user.role === 'supplier') {
    return <SupplierDashboard user={user} />;
  }

  return <ClientDashboard user={user} />;
};

export default Dashboard;