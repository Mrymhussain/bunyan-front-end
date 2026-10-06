import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getOrder,
  updateOrder,
} from '../../services/orderService';

import './OrderForm.css';

const EditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    status: '',
    total_price: 0,
  });

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const order = await getOrder(orderId);

        setFormData({
          status: order.status,
          total_price: order.total_price,
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadOrder();
  }, [orderId]);

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
      await updateOrder(orderId, {
        status: formData.status,
        total_price: Number(formData.total_price),
      });

      navigate(`/orders/${orderId}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="order-form-page">
      <section className="order-form-header">
        <p className="order-form-label">
          Order Management
        </p>

        <h1>Edit Order</h1>

        <p>
          Update the current status of Order #{orderId}.
        </p>
      </section>

      <section className="order-form-card">
        {message && (
          <p className="order-form-message">
            {message}
          </p>
        )}

        <form
          className="order-form"
          onSubmit={handleSubmit}
        >
          <div className="order-form-field">
            <label htmlFor="status">
              Order Status
            </label>

            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Enter order status"
              required
            />
          </div>

          <div className="order-form-summary">
            <span>Current Total</span>

            <strong>
              {formData.total_price} BHD
            </strong>
          </div>

          <div className="order-form-actions">
            <button
              type="submit"
              className="order-form-submit"
            >
              Save Changes
              <span>→</span>
            </button>

            <button
              type="button"
              className="order-form-cancel"
              onClick={() =>
                navigate(`/orders/${orderId}`)
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

export default EditOrder;
