import React, { useState } from 'react';
import axios from 'axios';
import {Avatar, TextField, Button, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

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
            console.log(response.data);

            // Redirect to home page after successful login
            window.location.href = '/';
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <Grid>
            <Paper elevation={24} style={paperStyle} sx={{border:'1px solid #669999'}}>
                <Grid align='center'>
                    {/* <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar> */}
                    <h2 style={{marginBottom:'2px'}}>Sign In</h2>
                </Grid>
                <Grid align='center' >
                <h4 style={{color:'#bab3b1', fontFamily:'areial'}}>Welcome to Gourmet Heaven</h4>
                </Grid>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                    label='Username'
                    placeholder='Enter username'
                    variant="outlined"
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label='Password'
                    placeholder='Enter password'
                    type='password'
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleLogin}>Sign in</Button>
                
                <Typography> Do you have an account?
                    <Link href="/register" sx={{ml:'5px'}}>
                         Register
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login;
