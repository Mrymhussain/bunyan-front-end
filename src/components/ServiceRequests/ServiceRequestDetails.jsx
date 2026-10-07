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

import './ServiceRequestDetails.css';

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

  const formatDate = (date) => {
    if (!date) {
      return 'Not specified';
    }

    return new Date(date).toLocaleString();
  };

  if (message && !request) {
    return (
      <main className="service-request-details-page">
        <p className="service-request-details-message">
          {message}
        </p>
      </main>
    );
  }

  if (!request) {
    return (
      <main className="service-request-details-page">
        <p className="service-request-details-loading">
          Loading service request...
        </p>
      </main>
    );
  }

  return (
    <main className="service-request-details-page">
      <Link
        to="/service-requests"
        className="service-request-details-back"
      >
        ← Back to Service Requests
      </Link>

      <section className="service-request-details-layout">
        <div className="service-request-details-main">
          <section className="service-request-details-header">
            <div className="service-request-details-header-top">
              <div>
                <p className="service-request-details-label">
                  BUNYAN Services
                </p>

                <h1>
                  Service Request #{request.id}
                </h1>
              </div>

              <span className="service-request-details-status">
                {request.status}
              </span>
            </div>

            <p>
              View the service request details,
              preferred schedule, and current status.
            </p>
          </section>

          {message && (
            <p className="service-request-details-message">
              {message}
            </p>
          )}

          <section className="service-request-description">
            <p>Request Description</p>

            <h2>Service Details</h2>

            <span>
              {request.description || 'No description provided.'}
            </span>
          </section>

          <section className="service-request-details-info">
            <div>
              <span>Location</span>
              <strong>
                {request.location || 'Not specified'}
              </strong>
            </div>

            <div>
              <span>Preferred Date</span>
              <strong>
                {formatDate(request.preferred_date)}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{request.status}</strong>
            </div>
          </section>
        </div>

        <aside className="service-request-details-sidebar">
          <div className="service-request-summary">
            <p>Request Summary</p>

            <div>
              <span>Request Number</span>
              <strong>#{request.id}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{request.status}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>
                {request.location || 'Not specified'}
              </strong>
            </div>
          </div>

          <div className="service-request-details-actions">
            <Link
              to={`/service-requests/${request.id}/edit`}
              className="service-request-edit-button"
            >
              Edit Request
            </Link>

            <button
              type="button"
              className="service-request-delete-button"
              onClick={handleDelete}
            >
              Delete Request
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ServiceRequestDetails;
