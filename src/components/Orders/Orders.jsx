import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getOrders } from '../../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadOrders();
  }, []);

  return (
    <main>
      <h1>My Orders</h1>

      {message && <p>{message}</p>}

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <h2>Order #{order.id}</h2>

              <p>Status: {order.status}</p>
              <p>Total: {order.total_price} BHD</p>

              <Link to={`/orders/${order.id}`}>
                View Order
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Orders;