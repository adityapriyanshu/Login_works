import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../food.png';
import { Button } from '@mui/material';
import axios from 'axios';

const HomeMenu = () => { 
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8082/menu/view'); // Replace with your backend API endpoint
          setMenuItems(response.data.data.slice(0, 3)); // Get first 3 items for initial display
        } catch (error) {
          console.error('Error fetching menu items:', error);
        }
      };
      fetchData();
    }, []);
  
    return (
      <div style={{ padding: '2rem' }}> 
        <Typography variant="h4" align="center" gutterBottom>
          Pick from variety of cuisines
        </Typography>
        <Grid container spacing={3}>
          {menuItems.map((item) => (
            <Grid size={4} item xs={6} key={item.id}>
              <Card elevation={8} sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 180 }}
                  image={image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.foodName}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    ${item.foodPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {"lorem ispum asirae naieowen oriaien glfg"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button variant="contained" color="primary" href="/menu">
            View Full Menu
          </Button>
        </div>
      </div>
    );
  }
export default HomeMenu;