


import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";




function Home() {

  const navigate = useNavigate();

  const user = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('All'); // to handle active platform choice filtering

  const getPlatformLogo = (platform) => {
  
    const logos = {
      PlayStation: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><path d="M492 277.5c-4.4-16-16-29.6-34.4-38.3C417 219.7 341.2 216 261 216c-31.4 0-61.4.6-89 2l21.3-64.8c42 1.3 84.7 3.5 124.5 9.7 27 4.2 46 11 54.3 22.3 4.3 5.8 5.7 13 4 21-3.4 16.4-15 30-34.6 39.5l-8.4-4.7c14-7.5 22-16.7 24.3-27.4 2-9-.4-15.6-7-19.6-8-5-26.6-10-58-13.6-35.3-4.2-74-6.3-112-7l-.3-.5c-15.3-.3-30.2-.4-44.5-.4-25.5 0-48.4.5-68 2l-7 1.8c-1.3.4-1.7 1-1.3 1.6l4 5.3s104 153.2 135 197c11.7 16.6 19.3 28.5 28.3 28.5 6 0 11-4.7 15.3-14.4l34-80.4c64 3.7 125 11 173 23 27 6.8 45 15.4 51.5 26.5 4.3 7 4.5 15.3.4 24.7-6 13.8-21.7 26.3-46.5 35l-4.5-9c17.5-6.7 28.4-15.2 32-24.8 3.3-8.8 1.4-15-.4-18-6-10-27-18.4-58.4-25-45.7-9.7-104-16.5-165.7-20l-16 38c-11.4 27.2-24 50-37.4 67.5-12.7 16.7-26.2 26-41 26-19 0-33-14.7-43-44-12.6-37-23-88.7-31-151.7l-.3-.6c-13.5 1-26 2.3-37.6 4-22 3-38.3 8.3-48 15.7-7 5.4-10.4 12.3-10 20.6.7 16 11.2 31.7 29.5 44.2l-6 7.6c-22.3-15-35.2-34.2-36-55.8-.8-24.3 13.5-44.5 41-57 15-7 34-12 56-15.2 13-2 27.4-3.4 42.6-4.5C118 190.2 127 122.6 139 52l5-2.2c1.3-.5 2.2 0 2.5 1.4l11 63.3c3.4-.2 7-.3 10.4-.3 23 0 49 1.4 76.5 4 48 4.7 94 13.6 131 26 24.8 8.4 41.7 19.4 49 32.7 6.3 11 7 24 2 39.5l-.5 1z"/></svg>',
      GooglePlay: 'https://img.icons8.com/color/140/google-play.png',
      Apple: 'https://img.icons8.com/ios-filled/140/ffffff/mac-os.png',
      Xbox: 'https://img.icons8.com/ios-filled/140/ffffff/xbox.png',
      Netflix: 'https://img.icons8.com/color/140/netflix.png',
      Huawei: 'https://img.icons8.com/color/140/huawei.png',
      Amazon: 'https://img.icons8.com/windows/140/ffffff/amazon-alexa.png',
      Steam: 'https://img.icons8.com/ios-filled/140/ffffff/steam.png',
      noon: 'https://placehold.co/140x140/000000/ffec00?text=noon',
      Shahid: 'https://placehold.co/140x140/110929/00ff66?text=Shahid'
    };
    return logos[platform] || 'https://img.icons8.com/ios-filled/140/ffffff/gift-card.png'; // default card img
  };


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
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(190px, 3fr))",
        gap: "30px",
        margin: "40px",
        marginLeft: "100px",
         marginright: "10px"
      }}
    >
      {platforms.filter((p) => p !== "All").map((platform) => (
        
        <div className="platform-card"
        key={platform}

            onClick={() => navigate(`/platform/${platform}`)} >
            <img
              src={getPlatformLogo(platform)}
              alt={platform}
              style={{
                width: "100%",
                height: "90px",
                objectFit: "contain",
                marginBottom: "5px",
              }}
            />

            <h3  style={{ color:"#fff"
              }}>
                {platform}</h3>
          </div>
        ))}
    </div>
  </div>
);
}

export default Home ; 