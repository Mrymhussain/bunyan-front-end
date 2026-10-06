import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getOrders } from '../../services/orderService';

import './Orders.css';

const Orders = () => {
  const { user } = useContext(UserContext);

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

  const getHeading = () => {
    if (user?.role === 'supplier') {
      return 'Customer Orders';
    }

    if (user?.role === 'admin') {
      return 'Orders';
    }

    return 'My Orders';
  };

  return (
    <main className="orders-page">
      <section className="orders-header">
        <p className="orders-label">
          BUNYAN Marketplace
        </p>

        <h1>{getHeading()}</h1>

        <p>
          {user?.role === 'supplier'
            ? 'View and manage material orders from clients.'
            : 'Track your building material orders and their current status.'}
        </p>
      </section>

      {message && (
        <p className="orders-message">
          {message}
        </p>
      )}

      {orders.length === 0 ? (
        <section className="orders-empty">
          <div className="orders-empty-number">
            01
          </div>

          <h2>No orders yet</h2>

          <p>
            {user?.role === 'client'
              ? 'Browse materials and place your first order.'
              : 'There are no orders available right now.'}
          </p>

          {user?.role === 'client' && (
            <Link to="/materials">
              Browse Materials →
            </Link>
          )}
        </section>
      ) : (
        <section className="orders-grid">
          {orders.map((order, index) => (
            <article
              key={order.id}
              className="order-card"
            >
              <div className="order-card-top">
                <span className="order-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <div className="order-card-content">
                <p className="order-label">
                  Material Order
                </p>

                <h2>Order #{order.id}</h2>

                <div className="order-info">
                  <div>
                    <span>Total</span>

                    <strong>
                      {order.total_price} BHD
                    </strong>
                  </div>

                  <div>
                    <span>Status</span>

                    <strong>
                      {order.status}
                    </strong>
                  </div>
                </div>
              </div>

              <Link
                to={`/orders/${order.id}`}
                className="order-view-link"
              >
                View Order
                <span>→</span>
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Orders;
