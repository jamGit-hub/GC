import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  
    const handleLogin = async (e) => { e.preventDefault();

      setError("");
      setLoading(true);

      try {
        const data = await api.login(username, password);

        if (data?.token) {
          // store auth data
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("role", data.user?.role);

          // role-based redirect
          if (data.user?.role === "admin") {
            navigate("/Admin_Dashboard");
          } else {
            navigate("/");
          }
        } else {
          setError(data?.message || "Invalid username or password");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
        setPassword(""); // clear password on attempt
      }
    };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: '80px auto', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      
      <h2 style={{ textAlign: 'center', color: '#1e1e2f', marginBottom: '10px' }}>GC Account Login</h2>

      {error && (
        <div style={{ padding: '10px', background: '#fde8e8', color: '#e53e3e', border: '1px solid #f8b4b4', borderRadius: '4px', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#4a4a5a' }}>Username:</label>
          <input 
            type="text" 
            placeholder="Enter your username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }} 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#4a4a5a' }}>Password:</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '12px', background: '#FF9B51', color: '#1e1e2f', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', transition: 'background 0.2s' }}
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>


        <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', color: '#666' }}>
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/register')} 
            style={{ color: '#1e1e2f', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            Sign Up here
          </span>
        </p>

      </form>
    </div>
  );
}