import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Function to dynamically import images
const importAll = (r) => {
  // images - An empty object to store the imported images.
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

// Import all images from the Images directory and store it in 'images' variable
const images = importAll(require.context('./Images', false, /\.(png|jpe?g|svg)$/));

const HomeMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/menu/view');
        setMenuItems(response.data.data.slice(0, 3)); // Get first 3 items for display
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchData();
  }, []);

  const handleOnclickMenu = () => {
    window.location.href = '/menu';
  };

  return (
    <div style={{ padding: isMobile ? '1rem' : '2rem' }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Pick from variety of cuisines
      </Typography>
      <Grid container spacing={isMobile ? 2 : 3} onClick={handleOnclickMenu} sx={{ cursor: 'pointer' }}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card elevation={8} sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
              <CardMedia
                component="img"
                sx={{
                  width: isMobile ? '100%' : 180,
                  height: isMobile ? 200 : 150,
                  objectFit: 'cover',
                }}
                image={
                  images[`${item.foodName}.jpg`] ||
                  images[`${item.foodName}.png`] ||
                  'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'
                }
                alt={item.foodName}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" mt={1}>
                  {item.foodName}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2" pl={1} mt={2}>
                  ₹{item.foodPrice}.00
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button variant="contained" color="primary" sx={{ backgroundColor: '#ab3434' }} href="/menu">
          View Full Menu
        </Button>
      </div>
    </div>
  );
};

export default HomeMenu;