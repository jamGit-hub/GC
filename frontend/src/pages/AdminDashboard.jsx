import React, { useEffect, useState } from "react";
import { api } from "../services/api";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // product form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("");
  const [region, setRegion] = useState("");

  const [message, setMessage] = useState("");

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers?.(); // if you have it
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("No users API yet");
    }
  };

  

        const handleDeleteProduct = async (id) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        
            if (!confirmDelete) return;
        
            try {
            await api.deleteProduct?.(id);
            fetchProducts();
            } catch (err) {
            console.log(err);
            }
        };

  const handleSaveProduct = async () => {
    try {
      if (editingId) {
        // UPDATE
        await api.updateProduct(editingId, {
          name,
          price: parseFloat(price),
          platform,
          region,
        });
        setMessage("Product updated!");
      } else {
        // ADD
        await api.addProduct({ name, price: parseFloat(price), platform, region });
        setMessage("Product added!");
      }
  
      resetForm();
      fetchProducts();
    } catch (err) {
      setMessage("Operation failed");
    }
  };

  // ---------------- USER ACTIONS ----------------
  const handleRoleChange = async (id, role) => {
    try {
      await api.updateUserRole?.(id, role);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.deleteUser?.(id);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setPlatform(p.platform);
    setRegion(p.region);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setPlatform("");
    setRegion("");
  };

  // ---------------- UI ----------------
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* TABS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("products")}>
          Manage Products
        </button>
        <button onClick={() => setActiveTab("users")}>
          Manage Users
        </button>
      </div>

      {/* ---------------- PRODUCTS ---------------- */}
      {activeTab === "products" && (
        <div>
          <h2>Products</h2>

          <div style={{ marginBottom: "20px" }}>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input placeholder="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
            <input placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} />

            <button onClick={handleSaveProduct}>
  {editingId ? "Update Product" : "Add Product"}
</button>
            {editingId && (
  <button onClick={resetForm}>
    Cancel
  </button>
)}
          </div>

          <p>{message}</p>

          {/* PRODUCT LIST */}
          {products.map((p) => (
            <div key={p.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <h4>{p.name}</h4>
              <p>{p.platform} - {p.region}</p>
              <p>SAR {p.price}</p>

              <button onClick={() => handleDeleteProduct(p.id)}>
                Delete
              </button>
              <button onClick={() => startEdit(p)}> Edit</button>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- USERS ---------------- */}
      {activeTab === "users" && (
        <div>
          <h2>Users</h2>

          {users.length === 0 && <p>No users loaded yet</p>}

          {users.map((u) => (
            <div key={u.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <h4>{u.username}</h4>
              <p>Role: {u.role}</p>

              <button onClick={() => handleRoleChange(u.id, "admin")}>
                Make Admin
              </button>

              <button onClick={() => handleRoleChange(u.id, "user")}>
                Make User
              </button>

              <button onClick={() => handleDeleteUser(u.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

