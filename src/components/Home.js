import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/cormorant/700.css';
import '@fontsource/cormorant/700-italic.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const HomeBody = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile

  return (
    <div
      style={{
        backgroundImage: `url('https://espacendesign.com/wp-content/uploads/2024/09/Restaurant-interior-designer-low-budget-1-scaled.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '85vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      ></div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: isMobile ? 2 : 0,
        }}
      >
        <Typography
          variant="h2"
          color="white"
          sx={{
            mb: 1,
            pt: isMobile ? 10: 0,
            mt: isMobile ? 10 : 20, 
            fontFamily: "'Cormorant', 'serif'",
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: isMobile ? '6vh' : '14vh', 
          }}
        >
          Welcome to Gourmet Heaven
        </Typography>
        <Typography
          variant="body1"
          color="white"
          sx={{
            textAlign: 'center',
            fontSize: isMobile ? '2.5vh' : 'inherit', 
            px: isMobile ? 5 : 0, 
          }}
        >
          Your friendly neighbourhood restaurant serving delicious food.
        </Typography>
      </Box>
    </div>
  );
};

export default HomeBody;