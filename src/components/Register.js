import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, TextField, Button, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const paperStyle = { padding: '20px  20px 30px 20px', height: 'auto', width: 280, margin: "50px auto",border: '1px solid #ab3434' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '15px 0', backgroundColor: '#ab3434'  };

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8082/user/adduser',
                {
                    username,
                    password,
                    roles: "ROLE_CUSTOMER",
                }
            );

            // Show success message
            console.log(response.status)
            setSuccess('Registration successful! Please log in.');
            setError('');
            setTimeout(() => {
                window.location.href = '/login'
            }, 5000);
        } catch (error) {
            setError('Error during registration: ' + error.message);
            setSuccess('');
        }
    };

    return (
        <Grid>
            <Paper elevation={24} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={{marginBottom:'10px'}}>Register</h2>
                </Grid>
                <Grid align='center' >
                    <h3 style={{color:'#ab3434', fontFamily:'areial'}}>Join Gourmet Heaven</h3>
                </Grid>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <TextField
                    label='Username'
                    placeholder='Enter username'
                    variant="outlined"
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{mb:'7px'}}
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
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleRegister}>Register</Button>
                <Typography style={{ paddingLeft: '5px', }}> Already have an account?
                    <Link href="/login" sx={{ ml: '5px' }}>
                        Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Register;
