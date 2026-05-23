
//products page when filtered by platform
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

import PlatformLogo from "../components/platformLogos";

function PProducts() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const isAdmin = user?.role === "admin";

  const [products, setProducts] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); 


  
  useEffect(() => {
    api.getProducts().then((data) => {
      const filtered = data.filter((p) => p.platform === name);
      setProducts(filtered);
    });
  }, [name]);

  const handleAddToCart = async (productId) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const res = await api.addToCart(user.id, productId, 1);
      alert(res.message || "Added to cart");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>{name} Gift Cards</h1>

      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: "30px",
          marginTop: "40px",
        }}
      >
        {products.map((p) => (

  <div key={p.id} className="product-card">
    <PlatformLogo platform={p.platform} />

  
            <hr />

            <p style={{ fontWeight: "bold" }}>{p.name}</p>
            <p>{p.region}</p>
            <p>SAR {p.price}</p>

            {!isAdmin && (
              <button 
                onClick={() => handleAddToCart(p.id)} >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      {showLoginPrompt && (
        <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
                background: "#1e1e2f",
                padding: "25px",
                width: "320px",
                borderRadius: "12px",
                textAlign: "center",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                animation: "fadeIn 0.2s ease-in-out",
              }}
          >
            <h3 style={{ marginBottom: "10px" }}>Login Required</h3>
            <p>You need to login to your account</p>

            <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setShowLoginPrompt(false)}
          style={{

            flex: 1, padding: "10px",
            borderRadius: "8px",
            border: "none",  background: "#444",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",

          }}
        >
          Cancel
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{ flex: 1,
            padding: "10px", borderRadius: "8px",
            border: "none", background: "#4CAF50",
            color: "#fff",cursor: "pointer", fontWeight: "bold",
          }} >
          Login
        </button>
      </div>
    </div>
  </div>
      )}
    </div>
  );
}

export default PProducts;