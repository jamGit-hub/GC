
    import React, { useEffect, useState } from "react";
    import { api } from "../services/api";

function OrderHistory(){

    

      const [orders, setOrders] = useState([]);
    
      const user = JSON.parse(localStorage.getItem("user"));
    
       const activeId = user.id || user.user_id || user.userId;
            
  


      useEffect(() => {
        fetchOrders();
      }, []);
    
      const fetchOrders = async () => {
        try {
          const data = await api.getOrderHistory(user.id);
          console.log("ORDERS FROM API:", data); 
          setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error(err);
        }
      };
      return (
        <div style={{ padding: "20px" }}>
          <h1>My Orders</h1>
    
          {orders.length === 0 && <p>No orders yet</p>}
    
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <h3>Order #{order.id}</h3>
              <p>Status: <b>{order.status}</b></p>
    
              <div>
                {order.items?.map((item, i) => (
                  <div key={i}>
                    • {item.product_name} — {item.quantity}x — SAR {item.price}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

export default OrderHistory;