import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getServiceRequests } from '../../services/serviceRequestService';

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await getServiceRequests();
        setRequests(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadRequests();
  }, []);

  return (
    <main>
      <h1>My Service Requests</h1>

      {message && <p>{message}</p>}

      {requests.length === 0 ? (
        <p>No service requests yet.</p>
      ) : (
        <div>
          {requests.map((request) => (
            <div key={request.id}>
              <h2>Service Request #{request.id}</h2>

              <p>{request.description}</p>
              <p>Location: {request.location}</p>
              <p>Preferred Date: {request.preferred_date}</p>
              <p>Status: {request.status}</p>

              <Link to={`/service-requests/${request.id}`}>
                View Request
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ServiceRequests;