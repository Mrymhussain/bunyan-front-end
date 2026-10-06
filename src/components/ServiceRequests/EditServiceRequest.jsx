import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getServiceRequest,
  updateServiceRequest,
} from '../../services/serviceRequestService';

import '../Services/ServiceRequestForm.css';

const EditServiceRequest = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    specialist_id: '',
    service_category_id: '',
    description: '',
    location: '',
    preferred_date: '',
    status: '',
  });

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const request = await getServiceRequest(requestId);

        setFormData({
          specialist_id: request.specialist_id,
          service_category_id: request.service_category_id,
          description: request.description || '',
          location: request.location || '',
          preferred_date: request.preferred_date
            ? request.preferred_date.slice(0, 16)
            : '',
          status: request.status,
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadRequest();
  }, [requestId]);

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await updateServiceRequest(requestId, {
        specialist_id: Number(formData.specialist_id),
        service_category_id: Number(formData.service_category_id),
        description: formData.description,
        location: formData.location,
        preferred_date: formData.preferred_date,
        status: formData.status,
      });

      navigate(`/service-requests/${requestId}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="service-request-form-page">
      <section className="service-request-form-header">
        <p className="service-request-form-label">
          Manage Service
        </p>

        <h1>Edit Service Request</h1>

        <p>
          Update the job details, location,
          or preferred date.
        </p>
      </section>

      <section className="service-request-form-card">
        {message && (
          <p className="service-request-form-message">
            {message}
          </p>
        )}

        <form
          className="service-request-form"
          onSubmit={handleSubmit}
        >
          <div className="service-request-form-field">
            <label htmlFor="description">
              Job Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the work you need..."
              rows="5"
              required
            />
          </div>

          <div className="service-request-form-row">
            <div className="service-request-form-field">
              <label htmlFor="location">
                Location
              </label>

              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Service location"
                required
              />
            </div>

            <div className="service-request-form-field">
              <label htmlFor="preferred_date">
                Preferred Date
              </label>

              <input
                type="datetime-local"
                id="preferred_date"
                name="preferred_date"
                value={formData.preferred_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="service-request-form-actions">
            <button
              type="submit"
              className="service-request-form-submit"
            >
              Save Changes
              <span>→</span>
            </button>

            <button
              type="button"
              className="service-request-form-cancel"
              onClick={() =>
                navigate(`/service-requests/${requestId}`)
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditServiceRequest;
