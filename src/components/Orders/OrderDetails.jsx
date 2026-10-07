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
  deleteOrder,
  deleteOrderItem,
  getOrder,
  getOrderItems,
  updateOrder,
} from '../../services/orderService';

import './OrderDetails.css';


const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');


  const loadOrder = async () => {
    try {
      const orderData = await getOrder(orderId);
      const itemData = await getOrderItems(orderId);

      setOrder(orderData);
      setItems(itemData);
      setStatus(orderData.status);
    } catch (err) {
      setMessage(err.message);
    }
  };


  useEffect(() => {
    loadOrder();
  }, [orderId]);


  const handleDeleteItem = async (itemId) => {
    const confirmed = window.confirm(
      'Remove this item from the order?'
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
      'Cancel this order?'
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


  const handleStatusUpdate = async (evt) => {
    evt.preventDefault();

    try {
      const updated = await updateOrder(
        orderId,
        { status }
      );

      setOrder(updated);
      setStatus(updated.status);
      setMessage('');
    } catch (err) {
      setMessage(err.message);
    }
  };


  const formatStatus = (value) => {
    return value
      ?.replaceAll('_', ' ')
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };


  if (message && !order) {
    return (
      <main className="order-details-page">
        <p className="order-details-message">
          {message}
        </p>
      </main>
    );
  }


  if (!order) {
    return (
      <main className="order-details-page">
        <p className="order-details-loading">
          Loading order...
        </p>
      </main>
    );
  }


  return (
    <main className="order-details-page">

      <Link
        to="/orders"
        className="order-details-back"
      >
        ← Back to Orders
      </Link>


      <section className="order-details-layout">

        <div className="order-details-main">

          <section className="order-details-heading">

            <div className="order-details-heading-top">

              <div>
                <p className="order-details-label">
                  BUNYAN Marketplace
                </p>

                <h1>Order #{order.id}</h1>
              </div>

              <span className="order-details-status">
                {formatStatus(order.status)}
              </span>

            </div>


            <p>
              {user?.role === 'supplier'
                ? 'Review the ordered materials and update the order as it is prepared.'
                : 'View your materials and track the current order status.'}
            </p>

          </section>


          {message && (
            <p className="order-details-message">
              {message}
            </p>
          )}


          <section className="order-items-section">

            <div className="order-items-header">
              <div>
                <p>Order Contents</p>
                <h2>Order Items</h2>
              </div>

              <span>
                {items.length}{' '}
                {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>


            {items.length === 0 ? (
              <div className="order-items-empty">
                <p>No items in this order.</p>
              </div>
            ) : (
              <div className="order-items-list">

                {items.map((item, index) => (
                  <article
                    key={item.id}
                    className="order-item-card"
                  >

                    <div className="order-item-number">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="order-item-details">
                      <span>Material</span>
                      <strong>
                        Material #{item.material_id}
                      </strong>
                    </div>

                    <div className="order-item-details">
                      <span>Quantity</span>
                      <strong>{item.quantity}</strong>
                    </div>

                    <div className="order-item-details">
                      <span>Unit Price</span>
                      <strong>
                        {item.unit_price} BHD
                      </strong>
                    </div>

                    {user?.role === 'client' &&
                      order.status === 'pending' && (
                        <button
                          type="button"
                          className="order-item-remove"
                          onClick={() =>
                            handleDeleteItem(item.id)
                          }
                        >
                          Remove
                        </button>
                      )}

                  </article>
                ))}

              </div>
            )}

          </section>

        </div>


        <aside className="order-details-sidebar">

          <div className="order-summary-card">

            <p className="order-summary-label">
              Order Summary
            </p>

            <div>
              <span>Order Number</span>
              <strong>#{order.id}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>
                {formatStatus(order.status)}
              </strong>
            </div>

            <div>
              <span>Total</span>
              <strong>
                {order.total_price} BHD
              </strong>
            </div>

            <div>
              <span>Items</span>
              <strong>{items.length}</strong>
            </div>

          </div>


          {user?.role === 'supplier' && (
            <form
              className="order-status-form"
              onSubmit={handleStatusUpdate}
            >
              <label htmlFor="order-status">
                Update Order Status
              </label>

              <select
                id="order-status"
                value={status}
                onChange={(evt) =>
                  setStatus(evt.target.value)
                }
              >
                <option value="pending">
                  Pending
                </option>

                <option value="processing">
                  Processing
                </option>

                <option value="ready">
                  Ready
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


          {user?.role === 'client' &&
            order.status === 'pending' && (
              <div className="order-details-actions">

                <button
                  type="button"
                  className="order-delete-button"
                  onClick={handleDeleteOrder}
                >
                  Cancel Order
                </button>

              </div>
            )}

        </aside>

      </section>

    </main>
  );
};


export default OrderDetails;
