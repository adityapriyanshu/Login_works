import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../food.png'

function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/menu/view'); // backend API endpoint
        setMenuItems(response.data.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Full Menu
      </Typography>
      <Grid container spacing={3} >
        {menuItems.map((item) => (
          <Grid size={6} item xs={12} key={item.id} > 
            <Card square variant='outlined' sx={{ display: 'flex', alignItems: 'center', width:'500px' , border:'1px solid #ab3434', boxShadow: '3px 5px 5px #d9d7b6'}}> 
              <CardMedia
                component="img"
                sx={{ width: 150, height: 150, mr: 2 }}
                image={image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.foodName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.foodPrice.toFixed(2)} 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MenuSection;