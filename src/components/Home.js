import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function HomeBody() {
  return (
    <div style={{ 
        backgroundImage: `url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '80vh' 
      }}>
      <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%' 
        }}>
        <Typography variant="h2" color="white" sx={{ mb: 1, mt:20 }}>
          Welcome to Restaurant Name
        </Typography>
        <Typography variant="body1" color="white" sx={{ textAlign: 'center' }}>
          Your friendly neighborhood restaurant serving delicious food.
        </Typography>
      </Box>
    </div>
  );
}

export default HomeBody;