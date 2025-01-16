import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import '@fontsource/cormorant/600.css';

const Navbar = () => {

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('role');
        window.location.href = '/';
    }

    const handleLogoClick = () => {

        window.location.href = '/';
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={12} position='fixed' sx={{ backgroundColor: '#ab3434' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography onClick={handleLogoClick} variant='h5' component="div" sx={{ flexGrow: 1, fontFamily: "'Cormorant', 'serif'", textAlign: 'start', ml: 20, cursor: 'pointer' }}>
                        Gourmet Heaven
                    </Typography>
                    <Button color='inherit' href='/menu' sx={{ border: '1px solid white', mx: 1 }}>Menu</Button>
                    {localStorage.getItem('username') ?

                        <>
                            <Button color='inherit' href='/user-profile' sx={{ border: '1px solid white', mx: 1 }}>Orders</Button>
                            <Button color='inherit' onClick={handleLogout} sx={{ border: '1px solid white', mx: 1 }}>Logout</Button>
                        </> :
                        <Button color='inherit' href='/login' sx={{ border: '1px solid white', mx: 1 }}>Login</Button>

                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
