

// reusable functions 'using axios only'


//const BASE_URL = "http://localhost:3000/api"; used for fetch. axios doesnt need it. it has a baseURL already
import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

    // attach token automatically
    API.interceptors.request.use((req) => {
        const token = localStorage.getItem("token");
        if (token) {
          req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
      });

      export const api = {

        // auth
        login: (username, password) =>
          API.post("/users/login", { username, password }).then(res => res.data),
      
        register: (username, email, password) =>
          API.post("/users/register", { username, email, password }).then(res => res.data),
      
        // products
        getProducts: () =>
          API.get("/products").then(res => res.data),

         //prtoducts but for admin only
        updateProduct: (id, data) =>
          API.put(`/products/admin/${id}`, data).then(res => res.data),
      
        deleteProduct: (id) =>
          API.delete(`/products/admin/${id}`).then(res => res.data),
        addProduct: (data) =>
            API.post("/products/admin/add", data).then(res => res.data),
      
        // cart
        getCart: (userId) =>
          API.get(`/cart/${userId}`).then(res => res.data),
      
        addToCart: (userId, productId, quantity) =>
          API.post("/cart/add", {
            user_id: userId,
            product_id: productId,
            quantity
          }).then(res => res.data),
      
        removeFromCart: (cartId) =>
          API.delete(`/cart/${cartId}`).then(res => res.data),
        updateCartQuantity: (cartId, quantity) =>
          API.put(`/cart/${cartId}`, { quantity }).then(res => res.data),
        // orders
        checkout: (userId) =>
          API.post("/orders/checkout", { user_id: userId }).then(res => res.data),
      
        getOrderHistory: async (userId) => {
          const res = await API.get(`/orders/${userId}`);
          return res.data; 
        },
        // admin only prevliges
        getAllUsers: () =>{
          console.log("API HIT: /users/admin");
  return API.get("/users/admin").then(res => res.data);
},

        updateUserRole: (id, role) =>
            API.put(`/users/admin/${id}/role`, { role }).then(res => res.data),
      
        deleteUser: (id) =>
          API.delete(`/users/admin/${id}`).then(res => res.data),

       getAllOrders: () =>
         API.get("/orders/admin/viewOrders").then(res => res.data),
  

      updateOrderStatus: (orderId, status) =>
        API.put(`/orders/admin/viewOrders/${orderId}/status`, { status }) 
    
    };