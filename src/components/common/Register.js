import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const paperStyle = {
    padding: '20px 20px 30px 20px',
    height: 'auto',
    width: 280,
    margin: '50px auto',
    border: '1px solid #ab3434',
  };
  const btnstyle = { margin: '15px 0', backgroundColor: '#ab3434' };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8082/user/adduser', {
        username,
        password,
        roles: 'ROLE_CUSTOMER',
      });

      // Show success toast
      toast.success('Registration successful! Please login.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      // Clear form and errors
      setUsername('');
      setPassword('');
      setError('');
      setValidationErrors({});

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          // Handle validation errors from backend
          setValidationErrors(error.response.data.data);
          setError('Please fix the errors below.');
        } 
        
        else if (error.response.status === 409) {
          // to handle username already exists error
          setError(error.response.data.status);
          setValidationErrors({});
        } 
        
        else {
          setError('Error during registration: ' + error.response.data.status);
        }
      } 
      else {
        setError('Error during registration: ' + error.message);
      }
      setSuccess('');
    }
  };

  return (
    <Grid>
      <Paper elevation={24} style={paperStyle}>
        <Grid align="center">
          <h2 style={{ marginBottom: '10px' }}>Register</h2>
        </Grid>
        <Grid align="center">
          <h3 style={{ color: '#ab3434', fontFamily: 'areial' }}>Join Gourmet Heaven</h3>
        </Grid>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
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
          error={!!validationErrors.username}
          helperText={validationErrors.username}
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
          error={!!validationErrors.password}
          helperText={validationErrors.password}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleRegister}
        >
          Register
        </Button>
        <Typography style={{ paddingLeft: '5px' }}>
          Already have an account?
          <Link href="/login" sx={{ ml: '5px', color: '#ab3434' }}>
            Sign In
          </Link>
        </Typography>
      </Paper>
      <ToastContainer />
    </Grid>
  );
};

export default Register;