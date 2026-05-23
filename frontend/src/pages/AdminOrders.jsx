 import React, { useEffect, useState } from "react";
import { api } from "../services/api";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
      try {
        const data = await api.getAllOrders();
        console.log("ADMIN ORDERS:", data);

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    const handleStatusChange = async (orderId, status) => {
      try {
        await api.updateOrderStatus(orderId, status);
        fetchOrders(); // refresh
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div style={{ padding: "20px" }}>
        <h1>Orders</h1>

        {loading && <p>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p>No orders found</p>
        )}

        <div style={{ display: "grid", gap: "15px", marginTop: "20px", margin: "140px"}}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "20px",
                background: "#333",
                 padding:"40px" , textAlign:"left"
              }} >
              <h3>Order #{order.id}</h3>

              <p> User: {order.email}</p>
              <p>User ID: {order.user_id} </p>

              <p>Order Status: {order.status || "pending"} </p>

              <p>Total Price: SAR {order.total_price}</p>

              <p style={{ color: "#777" }}>
               Order Placed on {new Date(order.order_date).toLocaleString()}
              </p>

                    <select value={order.status}
        onChange={(e) => handleStatusChange(order.id, e.target.value)}
        style={{ padding: "6px",
          borderRadius: "6px",
          marginTop: "8px"
        }}
      >
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default AdminOrders;