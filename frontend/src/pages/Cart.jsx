import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function Cart() {

  const [cartItems, setCartItems] = useState([]);
 const user = JSON.parse(localStorage.getItem('user'));
 const [showDeleteItemPrompt, setShowDeleteItemPrompt] = useState(false);
 const [selectedItemId, setSelectedItemId] = useState(null);

 const loadCart = () => {
   if (user) api.getCart(user.id).then(data => setCartItems(Array.isArray(data) ? data : [])); // fill the cart , or as in render it 
 };

 useEffect(() => { loadCart(); }, []);

 const handleRemove = (id) => {
    setSelectedItemId(id);
    setShowDeleteItemPrompt(true);
  };
  const confirmDelete = async () => {
    await api.removeFromCart(selectedItemId);// delete item from cart
    loadCart();
    setShowDeleteItemPrompt(false);
    setSelectedItemId(null);
  };

  const cancelDelete = () => {
    setShowDeleteItemPrompt(false);
    setSelectedItemId(null);
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      await api.updateCartQuantity(cartId, quantity);
      loadCart();
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity <= 0) { // so basically remove the item 
      setSelectedItemId(cartId);
      setShowDeleteItemPrompt(true);
      return;
    }
    updateQuantity(cartId, newQuantity);
  };

   const handleCheckout = async () => {
    const res = await api.checkout(user.id);
       alert(res.message || 'Checkout status updated');
       setCartItems([]);
    };

    const CartTotal = cartItems.reduce( (sum, item) => sum + item.price * item.quantity,0); // total cost of items 

 return (
   <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

     <h1>Your Shopping Cart</h1>

     {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
       // then when ur cart is not empty
       <div>
         <table style={{ width: '500px', borderCollapse: 'collapse', marginTop: '20px'}}>
           <thead >
             <tr style={{ background: '#eee', textAlign: 'left', color:'#25343F' }}>
               <th style={{ padding: '10px' }}>Item</th>
               <th style={{ padding: '10px' }}>Price</th>
               <th style={{ padding: '10px' }}>quantity</th>
               <th style={{ padding: '10px' }}>Action</th>
             </tr>
           </thead>
           <tbody>
             {cartItems.map(item => ( // for each item to fill the table
               <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                 <td style={{ padding: '10px' }}>{item.name}</td>
                 <td>${item.price}</td>
                           

                   <td> 
                   <div
                   style={{ display: "flex",
                    alignItems: "center",  gap: "10px",  justifyContent: "center",
                  }}>

                   {item.quantity === 1 ? ( //two buttons based on quantity for Better UX ig
                        <button 
                        style={{ background: "none", border: "none", color: "#e74c3c", fontSize: "14px",
                            cursor: "pointer" }}
                          onClick={() => handleRemove(item.id)}>🗑</button>) 
                          : ( <button 
                            style={{ background: "none",
                                border: "none", color: "#fff",fontSize: "20px", cursor: "pointer", }}
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}> - </button>)}

                    <span style={{ color: "#fff", fontSize: "14px", }}>{item.quantity}</span>

                    <button 
                    style={{ background: "none", border: "none",color: "#fff",  fontSize: "18px", cursor: "pointer",}}
                    onClick={() =>handleQuantityChange(item.cart_id || item.id, item.quantity + 1) }> + </button>
                   
                   </div>
                    </td>

                    <td>
                   <button onClick={() => handleRemove(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                       Remove </button>

                 </td>
               </tr>
             )
           )  }
           </tbody>
         </table>
         <h2 style={{ textAlign: 'right', marginTop: '20px' }}> 
           Cart Total: SAR{CartTotal.toFixed(2)}
           </h2>
         <button onClick={handleCheckout} style={{ float: 'right', background: '#FF9B51', 
           color: 'white', border: 'none', padding: '12px 25px', 
           fontSize: '16px', cursor: 'pointer', borderRadius: '4px' }}>
           Place Order (Checkout)
         </button>

       </div>

       
     )}

{showDeleteItemPrompt && (
   <div style={{ position: "fixed", zIndex: 9999 }}>
      <div
        style={{ background: "#1e1e2f",
          padding: "25px",
          borderRadius: "12px", textAlign: "center",  color: "#fff",
          width: "300px"
        }} >
       <h3>Remove Item</h3>
       <p>Are you sure you want to remove this item from your cart?</p>
  
        <div style={{  display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          gap: "10px", }}>
          <button
            onClick={cancelDelete}
            style={{
              flex: 1, padding: "10px",
              borderRadius: "8px",  border: "none",  background: "#444",
              color: "#fff",  cursor: "pointer",  fontWeight: "bold", 
            }} >
            Cancel
          </button>
  
          <button
            onClick={confirmDelete}
            style={{
                flex: 1,
            padding: "10px", borderRadius: "8px",
            border: "none", background: "#e74c3c",
            color: "#fff",cursor: "pointer", fontWeight: "bold",
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div> )}
   </div>
 
);



}

export default Cart;