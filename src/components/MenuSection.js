import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import image from '../food.png';

function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState({}); // Object to store cart items and their quantities
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerTableNumber, setCustomerTableNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/menu/view');
        setMenuItems(response.data.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchData();
  }, []);

  const handleQuantityChange = (itemId, change) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (change === 'increment') {
        newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
      } else if (change === 'decrement' && newCartItems[itemId] > 0) {
        newCartItems[itemId] -= 1;
        if (newCartItems[itemId] === 0) {
          delete newCartItems[itemId]; // Remove item if quantity is 0
        }
      }
      return newCartItems;
    });
  };

  const handleAddToCart = (itemId) => {
    handleQuantityChange(itemId, 'increment');
  };

  const handleRemoveFromCart = (itemId) => {
    handleQuantityChange(itemId, 'decrement');
  };

  const getCartTotal = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const menuItem = menuItems.find((item) => item.id === parseInt(itemId));
      return total + (menuItem?.foodPrice || 0) * quantity;
    }, 0);
  };

  const placeOrder = async () => {
    // Retrieve stored credentials (if available)
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (!storedUsername || !storedPassword) {
      console.error('User credentials not found in local storage.');
      // Handle the case where credentials are not available (e.g., prompt for login)
      return;
    }

    const orderData = {
      customerName,
      customerPhoneNumber,
      customerTableNumber,
      orderItems: cartItems,
      username: storedUsername,
      password: storedPassword,
    };

    try {
      const response = await axios.post('http://localhost:8082/customer', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${storedUsername}:${storedPassword}`)}`,
        },
      });
      console.log('Order placed successfully:', response.data);
      // Handle successful order placement (e.g., clear cart, show confirmation message)
      setCustomerName('');
      setCustomerPhoneNumber('');
      setCustomerTableNumber('');
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle order placement error
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Full Menu
      </Typography>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid size={6} item xs={12} key={item.id}>
            <Card square variant="outlined" sx={{ display: 'flex', alignItems: 'center', width: '500px', border: '1px solid #ab3434', boxShadow: '3px 5px 5px #d9d7b6' }}>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton sx={{color:'#ab3434'}} onClick={() => handleRemoveFromCart(item.id)} disabled={!cartItems[item.id]}>
                    <RemoveIcon fontSize="small"  />
                  </IconButton>
                  <Typography variant="body1" style={{ margin: '0 10px' }}>
                    {cartItems[item.id] || 0}
                  </Typography>
                  <IconButton sx={{color:'green'}} onClick={() => handleAddToCart(item.id)} disabled={cartItems[item.id] >= 5}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Cart Section */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Cart</h2>
        <ul>
          {Object.entries(cartItems).filter(([itemId, quantity]) => quantity > 0).map(([itemId, quantity]) => { // Filter items with quantity > 0
            const menuItem = menuItems.find((item) => item.id === parseInt(itemId));
            return (
              <li key={itemId}>
                {menuItem.foodName} - Quantity: {quantity} - Price: ${menuItem.foodPrice.toFixed(2)}
              </li>
            );
          })}
        </ul>
        <p>Total: ${getCartTotal().toFixed(2)}</p>

        {/* Order Placement Section */}
        <div>
          <TextField
            label="Customer Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={customerPhoneNumber}
            onChange={(e) => setCustomerPhoneNumber(e.target.value)}
          />
          <TextField
            label="Table Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={customerTableNumber}
            onChange={(e) => setCustomerTableNumber(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={placeOrder}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MenuSection;
