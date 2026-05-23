import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

 function Navbar() {
    const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = user?.id;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
        <nav style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "12px 20px", background: "#1e1e2f",

        color: "#fff"
        }}>

        <div
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
            onClick={() => navigate("/")} >
            <img src="https://via.placeholder.com/40" style={{ height: "30px" }} />
            <h3 style={{ margin: 0 }}>GC Shop</h3>
        </div>



        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

            {/* not user */}
            {!isLoggedIn && (
            <button onClick={() => navigate("/login")}>Login</button>
            )}


            {isLoggedIn && !isAdmin && (
            <>
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/cart")}>Cart</button>
                <button onClick={() => navigate("/orderHistory")}>Orders</button>
                <button onClick={handleLogout}>Logout</button>
            </>
            )}


            {isLoggedIn && isAdmin && (
            <>
                <button onClick={() => navigate("/Admin_Dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/admin/orders")}>Orders</button>
                <button onClick={handleLogout}>Logout</button>
            </>
            )}

        </div>
        </nav>
    );



}


export default Navbar;