import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



 function Navbar() {
    const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = user?.id;
  const isAdmin = user?.role === "admin";

  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false); 

  // confirm befor logout btns
  const handleLogout = () => {
    setShowLogoutPrompt(true);
  };
  
  const confirmLogout = () => {
    localStorage.clear();
    setShowLogoutPrompt(false);
    navigate("/login");
  };
  
  const cancelLogout = () => {
    setShowLogoutPrompt(false);
  };

  return (
    <>
        <nav style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "12px 20px", background: "#1e1e2f",

        color: "#fff"
        }}>

        <div
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
            onClick={() => navigate("/")} >
            <img src="https://placehold.co/40x40" style={{ height: "30px" }} />
            <h3 style={{ margin: 0 }}>GC Store</h3>
        </div>



        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

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
                <button onClick={() => navigate("/ViewOrders")}>Orders</button>
                <button onClick={handleLogout}>Logout</button>
            </>
            )}

        </div>
        </nav>

{showLogoutPrompt && (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100%", height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 9999
      }}
    >
      <div
        style={{ background: "#1e1e2f",
          padding: "25px",
          borderRadius: "12px", textAlign: "center",  color: "#fff",
          width: "300px"
        }} >
        <h3>Logout?</h3>
        <p>Are you sure you want to log out?</p>
  
        <div style={{  display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          gap: "10px", }}>
          <button
            onClick={cancelLogout}
            style={{
              flex: 1, padding: "10px",
              borderRadius: "8px",  border: "none",  background: "#444",
              color: "#fff",  cursor: "pointer",  fontWeight: "bold", 
            }} >
            Cancel
          </button>
  
          <button
            onClick={confirmLogout}
            style={{
                flex: 1,
            padding: "10px", borderRadius: "8px",
            border: "none", background: "#e74c3c",
            color: "#fff",cursor: "pointer", fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div> )}
    
    </>
    );



}


export default Navbar;