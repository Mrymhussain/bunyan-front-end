import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getSpecialist } from '../../services/serviceService';

const SpecialistProfile = () => {
  const { specialistId } = useParams();

  const [specialist, setSpecialist] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSpecialist = async () => {
      try {
        const data = await getSpecialist(specialistId);
        setSpecialist(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadSpecialist();
  }, [specialistId]);

  if (message) {
    return <p>{message}</p>;
  }

  if (!specialist) {
    return <p>Loading specialist...</p>;
  }

  return (
    <main>
      <h1>{specialist.name}</h1>

      <p>Email: {specialist.email}</p>
      <p>Phone: {specialist.phone || 'Not specified'}</p>
      <p>
        Specialty: {specialist.specialty || 'Not specified'}
      </p>

      <Link to={`/specialists/${specialist.id}/request`}>
        Request Service
      </Link>

      <br />

      <Link to="/services">
        Back to Services
      </Link>
    </main>
  );
};

export default SpecialistProfile;