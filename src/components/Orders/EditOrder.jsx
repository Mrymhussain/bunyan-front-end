import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getOrder,
  updateOrder,
} from '../../services/orderService';

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
    <main>
      <h1>Edit Order</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="status">
            Status
          </label>

          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate(`/orders/${orderId}`)}
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default EditOrder;