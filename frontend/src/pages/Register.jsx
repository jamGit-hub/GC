

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function Register() {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.includes('@')) {
        setError('Enter a valid email.');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
        const data = await api.register(username, email, password);
    
        if (data && (data.success || data.token)) {
            setSuccess('Account created! Redirecting...');
      
            setTimeout(() => {
              navigate('/login');
            }, 1500);
          } else {
            setError(data.message || 'Registration failed.');
          }
        } catch (err) {
          setError('Server error. Try again later.');
        } finally {
          setLoading(false);
        }
      };

  return (
    <div style={{ padding: '50px', width: '350px',
     margin: '60px auto', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      
      <h2 style={{ textAlign: 'center', color: '#1e1e2f', marginBottom: '10px' }}>Create an Account</h2>
      <p style={{ textAlign: 'center', fontSize: '14px',
         color: '#666', marginBottom: '25px' }}>Join GC Shop to order gift cards</p>

      {error && (
        <div style={{ padding: '10px', background: '#fde8e8', color: '#e53e3e', border: '1px solid #f8b4b4', borderRadius: '4px', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ padding: '10px', background: '#def7ec', color: '#03543f', border: '1px solid #bdf2d5', borderRadius: '4px', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
          {success}
        </div>
      )}

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>


      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#4a4a5a' }}>Email:</label>
            <input 
                type="text" 
                placeholder="eg.@mail.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }} 
            />
            </div>


        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#4a4a5a' }}>Username:</label>
            <input 
                type="text" 
                placeholder="Choose a username" 
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#4a4a5a' }}>Confirm Password:</label>
            <input 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }} 
            />
            </div>

            <button 
            type="submit" 
            disabled={loading}
            style={{  padding: '12px',    background: '#1e1e2f', 
                color: '#ffffff', 
                border: 'none',   borderRadius: '4px', 
                fontSize: '16px', 
                fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', 
                marginTop: '10px', 

                transition: 'background 0.2s' 
            }}
            >
            {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', color: '#666' }}>
            Already have an account?{' '}
            <span 
                onClick={() => navigate('/login')} 
                style={{ color: '#FF9B51', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>
                Login here
            </span>
            </p>

        </form>
        </div>
  );
}
    
export default Register;