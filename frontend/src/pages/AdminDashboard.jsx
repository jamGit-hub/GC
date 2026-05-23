import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import PlatformLogo from "../components/platformLogos";


function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // product form variables 
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("");
  const [region, setRegion] = useState("");

  const [message, setMessage] = useState("");


  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "products") fetchProducts();
  }, [activeTab]);

 // recalled for refreshing page
  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  // recalled for refreshing page
  const fetchUsers = async () => {
    console.log("Calling getAllUsers...");
    try {
      const data = await api.getAllUsers?.(); 
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("No users API yet");
    }
  };

  

     const handleDeleteProduct = async (id) => {
            const confirmDelete = window.confirm("Are you sure?");
            if (!confirmDelete) return;
        
            try {
            await api.deleteProduct(id); 
            setMessage("Product deleted!");
            fetchProducts();
            } catch (err) {
            console.error(err);
            setMessage("Delete failed");
            }
        };

        const handleSaveProduct = async () => { //for both adding and update. cus we are using the same form. 
            try {
            if (editingId) {
                await api.updateProduct(editingId, { //update call
                name,
                price: parseFloat(price),
                platform,
                region,
                });
                setMessage("Product updated!");
            } else {
                await api.addProduct({ name, price: parseFloat(price), platform, region }); //add or create new product call
                setMessage("Product added!");
            }
        
            resetForm();
            fetchProducts();
            } catch (err) {
            setMessage("Operation failed");
            }
        };

        //handling or amanging users 
        const handleRoleChange = async (id, role) => {
            try {
            await api.updateUserRole(id, role);
            fetchUsers();
            } catch (err) {
            console.log(err);
            }
        };

        const handleDeleteUser = async (id) => {
            try {
            await api.deleteUser(id);
            fetchUsers();
            } catch (err) {
            console.log(err);
            }
        };

        const startEdit = (p) => { //btn edit 
            setEditingId(p.id);
            setName(p.name);
            setPrice(p.price);
            setPlatform(p.platform);
            setRegion(p.region);
        };

        const resetForm = () => { //btn cancel
            setEditingId(null);
            setName("");
            setPrice("");
            setPlatform("");
            setRegion("");
        };


                        //UI

    return (
        <div style={{ padding: "20px" }}>
        <h1>Admin Dashboard</h1>

        <div 
        className="adminManageTabs"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button onClick={
                () => setActiveTab("products")  //what u wanna manage tabs 
            }> Manage Products
            </button>

            <button
             onClick={() => setActiveTab("users")}>  Manage Users
            </button>
        </div>

        {activeTab === "products" && ( 
            <div
            className="manageProductsTab" >
            <h2> Manage Products</h2>

            <div className="productsForm"
            style={{ marginBottom: "20px" }}>
                <input className="productsField"
                 placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

                <input className="productsField"
                 placeholder="eg. 150.55" value={price} onChange={(e) => setPrice(e.target.value)} />

                <select value={platform} //platform dropdown
       onChange={(e) => setPlatform(e.target.value)}
       className="productsField"
        style={{ padding: "6px",borderRadius: "6px", marginTop: "8px" }}>
        <option value="">Select Platform</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Netflix">Netflix</option>
        <option value="Apple">Apple</option>
        <option value="GooglePlay">Google Play</option>
        <option value="Xbox">Xbox</option>
        <option value="Steam">Steam</option>
        <option value="Amazon">Amazon</option>
        <option value="noon">noon</option>
        <option value="Shahid">Shahid</option>
        <option value="Huawei">Huawei</option>
        
      </select>

            <select value={region} //region dropdown
           onChange={(e) => setRegion(e.target.value)}
           className="productsField"
                style={{ padding: "6px",borderRadius: "6px", marginTop: "8px" }}>
                <option value="">Select Region</option>
                <option value="KSA">KSA</option>
                <option value="USA">USA</option>
                <option value="UAE">UAE</option>
                <option value="UK">UK</option>
                <option value="QATAR">QATAR</option>
                <option value="BAHRAIN">BAHRAIN</option>
                <option value="OMAN">OMAN</option>
                <option value="EUROPE">EUROPE</option>
                <option value="KUWAIT">KUWAIT</option>
            </select>

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

            {products.map((p) => (
                <div className="productsInAdminScreen" 
                
                key={p.id} style={{borderRadius:"20px", border: "1px solid #ddd", padding: "20px", marginTop:"30px" ,marginLeft: "140px", marginRight:"140px"}}>
                   <PlatformLogo platform={p.platform} />
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

        {activeTab === "users" && (
            <div>
            <h2>Manage Users</h2>

            {users.length === 0 && <p>No users loaded yet</p>}

            {users.map((u) => (
                <div className="usersInAdminScreen"  
                key={u.id} style={{borderRadius:"20px", border: "1px solid #ddd", padding: "20px", marginTop:"30px" ,marginLeft: "140px", marginRight:"140px"}}>
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

