
    import React, { useEffect, useState } from "react";
    import { api } from "../services/api";

function OrderHistory(){

    

      const [orders, setOrders] = useState([]);
      const user = JSON.parse(localStorage.getItem("user"));
       const activeId = user.id || user.user_id || user.userId;
    
      const fetchOrders = async () => {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          if (!user?.id) return;

          const data = await api.getOrderHistory(user.id);
          console.log("ORDERS FROM API:", data);
          setOrders(Array.isArray(data) ? data : []);

        } catch (err) {
          console.error(err);
        }
      }; 

      useEffect(() => {
        fetchOrders();
      }, []);

      return (
        <div style={{ padding: "20px" }}>
          <h1>Order History</h1>
    
          {orders?.length === 0 && <p>No orders yet</p>}
    
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                padding: "30px",
                borderRadius: "20px",
                marginBottom: "15px",
                marginTop: "40px", margin: "140px"
              }}
            >
              <h3>Order #{order.id}</h3>
              <p>Status: <b>{order.status}</b></p>
    
              <div style ={{ textAlign:"left"}}>
                {order.items?.map((item, i) => (
                  <div key={i}>
                    {i}. {item.product_name} — {item.quantity}x — SAR {item.price}
                  </div>
                ))}
                <p>Total Price: SAR {order.total_price}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

export default OrderHistory;