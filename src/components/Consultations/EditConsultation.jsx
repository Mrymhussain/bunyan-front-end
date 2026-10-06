import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getConsultation,
  updateConsultation,
} from '../../services/consultationService';

import '../Professionals/ConsultationForm.css';

const EditConsultation = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    scheduled_at: '',
    meeting_type: 'online',
  });

  useEffect(() => {
    const loadConsultation = async () => {
      try {
        const consultation = await getConsultation(consultationId);

        setFormData({
          topic: consultation.topic,
          description: consultation.description || '',
          scheduled_at: consultation.scheduled_at
            ? consultation.scheduled_at.slice(0, 16)
            : '',
          meeting_type: consultation.meeting_type,
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadConsultation();
  }, [consultationId]);

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
      await updateConsultation(consultationId, formData);

      navigate(`/consultations/${consultationId}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="consultation-form-page">
      <section className="consultation-form-header">
        <p className="consultation-form-label">
          Manage Consultation
        </p>

        <h1>Edit Consultation</h1>

        <p>
          Update the consultation topic, schedule,
          and meeting type.
        </p>
      </section>

      <section className="consultation-form-card">
        {message && (
          <p className="consultation-form-message">
            {message}
          </p>
        )}

        <form
          className="consultation-form"
          onSubmit={handleSubmit}
        >
          <div className="consultation-form-field">
            <label htmlFor="topic">
              Consultation Topic
            </label>

            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Consultation topic"
              required
            />
          </div>

          <div className="consultation-form-field">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the consultation..."
              rows="5"
            />
          </div>

          <div className="consultation-form-row">
            <div className="consultation-form-field">
              <label htmlFor="scheduled_at">
                Date and Time
              </label>

              <input
                type="datetime-local"
                id="scheduled_at"
                name="scheduled_at"
                value={formData.scheduled_at}
                onChange={handleChange}
                required
              />
            </div>

            <div className="consultation-form-field">
              <label htmlFor="meeting_type">
                Meeting Type
              </label>

              <select
                id="meeting_type"
                name="meeting_type"
                value={formData.meeting_type}
                onChange={handleChange}
              >
                <option value="online">
                  Online
                </option>

                <option value="in_person">
                  In Person
                </option>
              </select>
            </div>
          </div>

          <div className="consultation-form-actions">
            <button
              type="submit"
              className="consultation-form-submit"
            >
              Save Changes
              <span>→</span>
            </button>

            <button
              type="button"
              className="consultation-form-cancel"
              onClick={() =>
                navigate(`/consultations/${consultationId}`)
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

export default EditConsultation;