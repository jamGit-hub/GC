


import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import PlatformLogo from "../components/platformLogos";




function Home() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('All'); // to handle active platform choice filtering



  useEffect(() => { 
    // fetches the gift cards for everyone not only users w accounts
    api.getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error loading shop catalog:", err));
  }, []);


const isLoggedIn = user && user.id;

    // filter platforms
    const platforms = [
        "All",
        ...new Set(products.map((p) => p.platform).filter(Boolean)),
    ];

  // filter products by platform
  const filteredProducts =
    selectedPlatform === "All"
      ? products
      : products.filter((p) => p.platform === selectedPlatform);

      //cart function
  const handleAddToCart = async (productId) => {
    if (!user) return navigate("/login");

    try {
      const res = await api.addToCart(user.id, productId, 1);
      alert(res.message || "Added to cart");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };



              
          
// ACTUAL home when having an account
    return (
<div style={{ padding: "20px" }}>

      <h1>Gift Cards Store</h1>
<br/>
      <div
      style={{
        display: "grid",  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 3fr))",
        gap: "30px", margin: "40px",
        marginLeft: "100px",
         marginright: "10px"
      }}
    >
     {platforms
          .filter((p) => p !== "All")
          .map((platform) => (
            <div
              key={platform} className="platform-card"
              onClick={() => navigate(`/platform/${platform}`)}
              style={{ cursor: "pointer" }}  >
              <PlatformLogo platform={platform} />

              <h3 style={{ color: "#fff" }}>
                {platform}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;