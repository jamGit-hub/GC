import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function Cart() {

  const [cartItems, setCartItems] = useState([]);
 const user = JSON.parse(localStorage.getItem('user'));

 const loadCart = () => {
   if (user) api.getCart(user.id).then(data => setCartItems(Array.isArray(data) ? data : [])); // fill the cart , or as in render it 
 };

 useEffect(() => { loadCart(); }, []);

 const handleRemove = async (cartId) => {
   await api.removeFromCart(cartId);
   loadCart();
 }; // delete item from cart

   const handleCheckout = async () => {
    const res = await api.checkout(user.id);
       alert(res.message || 'Checkout status updated');
       setCartItems([]);
    };

 const CartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0); // total cost of items 

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
               <th style={{ padding: '10px' }}>Action</th>
             </tr>
           </thead>
           <tbody>
             {cartItems.map(item => ( // for each item to fill the table
               <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                 <td style={{ padding: '10px' }}>{item.name}</td>
                 <td>${item.price}</td>
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
   </div>
 
);



}

export default Cart;