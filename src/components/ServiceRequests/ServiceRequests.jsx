import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getServiceRequests } from '../../services/serviceRequestService';

import './ServiceRequests.css';


const ServiceRequests = () => {
  const { user } = useContext(UserContext);

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


  const formatDate = (date) => {
    if (!date) {
      return 'Not specified';
    }

    return new Date(date).toLocaleString();
  };


  const formatStatus = (status) => {
    return status
      ?.replaceAll('_', ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };


  const title =
    user?.role === 'admin'
      ? 'All Service Requests'
      : user?.role === 'specialist'
        ? 'Assigned Jobs'
        : 'My Service Requests';


  const description =
    user?.role === 'admin'
      ? 'Review service activity across the BUNYAN platform.'
      : user?.role === 'specialist'
        ? 'Manage your assigned jobs and keep clients updated.'
        : 'Track your property service requests and current status.';


  return (
    <main className="service-requests-page">

      <section className="service-requests-header">
        <p className="service-requests-label">
          BUNYAN Services
        </p>

        <h1>{title}</h1>

        <p>{description}</p>
      </section>


      {message && (
        <p className="service-requests-message">
          {message}
        </p>
      )}


      {requests.length === 0 ? (
        <section className="service-requests-empty">

          <div className="service-requests-empty-number">
            01
          </div>

          <h2>No service requests found</h2>

          <p>
            {user?.role === 'admin'
              ? 'There are no service requests on the platform yet.'
              : user?.role === 'specialist'
                ? 'You do not have any assigned jobs yet.'
                : 'Browse specialists and create your first service request.'}
          </p>

          {user?.role === 'client' && (
            <Link to="/services">
              Browse Services →
            </Link>
          )}

        </section>
      ) : (
        <section className="service-requests-grid">

          {requests.map((request, index) => (
            <article
              key={request.id}
              className="service-request-card"
            >

              <div className="service-request-card-top">
                <span className="service-request-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="service-request-status">
                  {formatStatus(request.status)}
                </span>
              </div>


              <div className="service-request-card-content">

                <p className="service-request-label">
                  Service Request #{request.id}
                </p>

                <h2>
                  {request.description || 'Service Request'}
                </h2>


                <div className="service-request-meta">

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

                </div>

              </div>


              <Link
                to={`/service-requests/${request.id}`}
                className="service-request-view-link"
              >
                View Request
                <span>→</span>
              </Link>

            </article>
          ))}

        </section>
      )}

    </main>
  );
};


export default ServiceRequests;
