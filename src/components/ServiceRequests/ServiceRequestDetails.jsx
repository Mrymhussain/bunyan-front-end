import {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import {
  deleteServiceRequest,
  getServiceRequest,
  updateServiceRequest,
} from '../../services/serviceRequestService';

import './ServiceRequestDetails.css';


const ServiceRequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    const loadRequest = async () => {
      try {
        const data = await getServiceRequest(requestId);

        setRequest(data);
        setStatus(data.status);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadRequest();
  }, [requestId]);


  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Cancel this service request?'
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


  const handleStatusUpdate = async (evt) => {
    evt.preventDefault();

    try {
      const updated = await updateServiceRequest(
        requestId,
        { status }
      );

      setRequest(updated);
      setStatus(updated.status);
      setMessage('');
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


  const formatStatus = (value) => {
    return value
      ?.replaceAll('_', ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
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
                {formatStatus(request.status)}
              </span>

            </div>

            <p>
              {user?.role === 'specialist'
                ? 'Review the client request and update the job as work progresses.'
                : 'View the service details, schedule, and current job status.'}
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
              <strong>
                {formatStatus(request.status)}
              </strong>
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
              <strong>
                {formatStatus(request.status)}
              </strong>
            </div>

            <div>
              <span>Location</span>
              <strong>
                {request.location || 'Not specified'}
              </strong>
            </div>
          </div>


          {user?.role === 'specialist' && (
            <form
              className="service-request-status-form"
              onSubmit={handleStatusUpdate}
            >
              <label htmlFor="status">
                Update Job Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(evt) =>
                  setStatus(evt.target.value)
                }
              >
                <option value="pending">
                  Pending
                </option>

                <option value="accepted">
                  Accepted
                </option>

                <option value="in_progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>

              <button type="submit">
                Save Status
              </button>
            </form>
          )}


          {user?.role === 'client' && (
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
                Cancel Request
              </button>

            </div>
          )}

        </aside>

      </section>

    </main>
  );
};


export default ServiceRequestDetails;
