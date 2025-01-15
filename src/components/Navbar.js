import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import '@fontsource/cormorant/600.css';

const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={12} position='fixed' sx={{backgroundColor: '#ab3434'}}>
                <Toolbar>
                    <Box sx={{flexGrow: 1}}/>
                    <Typography variant='h5' component="div" sx={{ flexGrow: 1 , fontFamily: "'Cormorant', 'serif'"}}>
                        Fine-Dine Restaurant
                    </Typography>
                    <Button color='inherit' href='/menu'>Menu</Button>
                    {localStorage.getItem('username') ?

                        
                    <Button color='inherit' href='/user-profile'>User</Button>:
                    <Button color='inherit' href='/login'>Login</Button>
                    }
                    
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
