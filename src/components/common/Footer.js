import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 1 }} component="footer">
      <Typography variant="body2" align="center" sx={{backgroundColor: '#ffffff', border:'1px solid white'}}>
        © {new Date().getFullYear()} Gourmet Heaven. All Rights Reserved.
        <br />
        Terms and Conditions Apply.
      </Typography>
    </Box>
  );
}

export default Footer;