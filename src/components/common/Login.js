import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Link } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Import Grid2
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const paperStyle = { padding: '20px  20px 30px 20px', height: 'auto', width: 280, margin: "50px auto", border: '1px solid #ab3434' };
  const btnstyle = { margin: '15px 0', backgroundColor: '#ab3434' };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8082/user/login',
        {
          username,
          password,
        }
      );

      // Store user credentials (temporarily) in local storage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('role', response.data.data);
      // Show success toast
      toast.success('Login Successful!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setSuccess('Login Successful!');
      setError('');

      

      console.log(response.data);

      // Redirect to home page after successful login
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); // Wait for the toast to disappear before redirecting
    } catch (error) {
      setError('Invalid username or password');
      setSuccess('');
    }
  };

  return (
    <Grid2
      container
      spacing={0}
      sx={{
        backgroundColor: '#2c3e50', // Set the background color for the entire page
        minHeight: '100vh', // Ensure the background covers the full height of the page
        display: 'flex',
        alignItems: 'center', // Center the login form vertically
        justifyContent: 'center', // Center the login form horizontally
      }}
    >
      <Grid2>
        <Paper elevation={24} style={paperStyle}>
          <Grid2 container justifyContent="center">
            <h3 style={{ margin: '10px' }}>Login</h3>
          </Grid2>
          <Grid2 container justifyContent="center">
            <h3 style={{ color: '#ab3434', fontFamily: 'areial' }}>Welcome to Gourmet Heaven</h3>
          </Grid2>

          {success && (
            <Typography style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
              {success}
            </Typography>
          )}
          {error && (
            <Typography style={{ color: 'red', fontWeight: 'normal', textAlign: 'center', marginBottom: '10px' }}>
              {error}
            </Typography>
          )}
          <TextField
            label="Username"
            placeholder="Enter username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: '7px' }}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography style={{ paddingLeft: '5px' }}>
            Don't have an account?
            <Link href="/register" sx={{ ml: '5px', color: '#ab3434' }}>
              Register
            </Link>
          </Typography>
        </Paper>
      </Grid2>
      {/* Add ToastContainer to display toasts */}
      <ToastContainer />
    </Grid2>
  );
};

export default Login;