import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router';

import {
  deleteServiceRequest,
  getServiceRequest,
} from '../../services/serviceRequestService';

const ServiceRequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const data = await getServiceRequest(requestId);
        setRequest(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadRequest();
  }, [requestId]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this service request?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteServiceRequest(requestId);
      navigate('/service-requests');
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (message) {
    return <p>{message}</p>;
  }

  if (!request) {
    return <p>Loading service request...</p>;
  }

  return (
    <main>
      <h1>Service Request #{request.id}</h1>

      <p>Description: {request.description}</p>
      <p>Location: {request.location}</p>
      <p>Preferred Date: {request.preferred_date}</p>
      <p>Status: {request.status}</p>

      <Link to={`/service-requests/${request.id}/edit`}>
        Edit Request
      </Link>

      <br />

      <button type="button" onClick={handleDelete}>
        Delete Request
      </button>

      <br />

      <Link to="/service-requests">
        Back to Service Requests
      </Link>
    </main>
  );
};

export default ServiceRequestDetails;