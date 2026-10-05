import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router';

import {
  deleteOrder,
  deleteOrderItem,
  getOrder,
  getOrderItems,
} from '../../services/orderService';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  const loadOrder = async () => {
    try {
      const orderData = await getOrder(orderId);
      const itemData = await getOrderItems(orderId);

      setOrder(orderData);
      setItems(itemData);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const handleDeleteItem = async (itemId) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this item?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteOrderItem(orderId, itemId);
      await loadOrder();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDeleteOrder = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this order?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteOrder(orderId);
      navigate('/orders');
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (message && !order) {
    return <p>{message}</p>;
  }

  if (!order) {
    return <p>Loading order...</p>;
  }

  return (
    <main>
      <h1>Order #{order.id}</h1>

      <p>Status: {order.status}</p>
      <p>Total: {order.total_price} BHD</p>

      {message && <p>{message}</p>}

      <section>
        <h2>Order Items</h2>

        {items.length === 0 ? (
          <p>No items in this order.</p>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.id}>
                <p>Material ID: {item.material_id}</p>
                <p>Quantity: {item.quantity}</p>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={handleDeleteOrder}
      >
        Delete Order
      </button>

      <br />

      <Link to="/orders">
        Back to Orders
      </Link>
    </main>
  );
};

export default OrderDetails;