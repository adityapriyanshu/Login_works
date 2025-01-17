
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Grid from '@mui/material/Grid2';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import image from '../food.png';
// import ShoppingCart from '@mui/icons-material/ShoppingCart';

// function MenuSection() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState({}); // Object to store cart items and their quantities
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
//   const [customerTableNumber, setCustomerTableNumber] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8082/menu/view');
//         setMenuItems(response.data.data);
//       } catch (error) {
//         console.error('Error fetching menu items:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleQuantityChange = (itemId, change) => {
//     setCartItems((prevCartItems) => {
//       const newCartItems = { ...prevCartItems };
//       if (change === 'increment') {
//         newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
//       } else if (change === 'decrement' && newCartItems[itemId] > 0) {
//         newCartItems[itemId] -= 1;
//         if (newCartItems[itemId] === 0) {
//           delete newCartItems[itemId]; // Remove item if quantity is 0
//         }
//       }
//       return newCartItems;
//     });
//   };

//   const handleAddToCart = (itemId) => {
//     handleQuantityChange(itemId, 'increment');
//   };

//   const handleRemoveFromCart = (itemId) => {
//     handleQuantityChange(itemId, 'decrement');
//   };

//   const getCartTotal = () => {
//     return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
//       const menuItem = menuItems.find((item) => item.id === parseInt(itemId));
//       return total + (menuItem?.foodPrice || 0) * quantity;
//     }, 0);
//   };

//   const placeOrder = async () => {
//     // Retrieve stored credentials (if available)
//     const storedUsername = localStorage.getItem('username');
//     const storedPassword = localStorage.getItem('password');

//     if (!storedUsername || !storedPassword) {
//       console.error('User credentials not found in local storage.');
//       // Handle the case where credentials are not available (e.g., prompt for login)
//       return;
//     }

//     const orderData = {
//       customerName,
//       customerPhoneNumber,
//       customerTableNumber,
//       orderItems: cartItems,
//       username: storedUsername,
//       password: storedPassword,
//     };

//     try {
//       const response = await axios.post('http://localhost:8082/customer', orderData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Basic ${btoa(`${storedUsername}:${storedPassword}`)}`,
//         },
//       });
//       console.log('Order placed successfully:', response.data);
//       // Handle successful order placement (e.g., clear cart, show confirmation message)
//       setCustomerName('');
//       setCustomerPhoneNumber('');
//       setCustomerTableNumber('');
//     } catch (error) {
//       console.error('Error placing order:', error);
//       // Handle order placement error
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Full Menu
//       </Typography>
//       <Grid container spacing={3}>
//         {menuItems.map((item) => (
//           <Grid size={6} item xs={12} key={item.id}>
//             <Card square variant="outlined" sx={{ display: 'flex', alignItems: 'center', width: '500px', border: '1px solid #ab3434', boxShadow: '3px 5px 5px #d9d7b6' }}>
//               <CardMedia
//                 component="img"
//                 sx={{ width: 150, height: 150, mr: 2 }}
//                 image={image}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="h2">
//                   {item.foodName}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Price: ₹{item.foodPrice.toFixed(2)}
//                 </Typography>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <IconButton sx={{ color: '#ab3434' }} onClick={() => handleRemoveFromCart(item.id)} disabled={!cartItems[item.id]}>
//                     <RemoveIcon fontSize="small" />
//                   </IconButton>
//                   <Typography variant="body1" style={{ margin: '0 10px' }}>
//                     {cartItems[item.id] || 0}
//                   </Typography>
//                   <IconButton sx={{ color: 'green' }} onClick={() => handleAddToCart(item.id)} disabled={cartItems[item.id] >= 5}>
//                     <AddIcon fontSize="small" />
//                   </IconButton>
//                 </div>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Cart Section */}
//       <Box sx={{ mt: 4 }}>
//         <Paper elevation={6} sx={{ p: 2, mb: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', border:'1px solid #ab3434' }}>
//           <ShoppingCart sx={{ mr: 1 , color:'#ab3434'}} />
//           <Typography variant="h5" gutterBottom> Cart
//           </Typography>
//         </Paper>
//         <Paper elevation={12} sx={{ p: 2, mb: 2, border:'1px solid #ab3434' }}>
//           <ul>
//             {Object.entries(cartItems).filter(([itemId, quantity]) => quantity > 0).map(([itemId, quantity]) => { // Filter items with quantity > 0
//               const menuItem = menuItems.find((item) => item.id === parseInt(itemId));
//               return (
//                 <li key={itemId} style={{ listStyleType: 'none', marginBottom: '1rem' }}>
//                   <Typography variant="body1">
//                     {menuItem.foodName} - Quantity: {quantity} - Price: ₹{menuItem.foodPrice.toFixed(2)}
//                   </Typography>
//                 </li>
//               );
//             })}
//           </ul>
//           <Typography variant="h6" align="center" sx={{ mt: 2 }}>
//             Total: ₹{getCartTotal().toFixed(2)}
//           </Typography>
//         </Paper>

//         {/* Order Placement Section */}
//         <Paper elevation={24} sx={{ p: 2 , mt:5, border:'1px solid #ab3434'}}>
//           <TextField
//             label="Customer Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//           />
//           <TextField
//             label="Phone Number"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={customerPhoneNumber}
//             onChange={(e) => setCustomerPhoneNumber(e.target.value)}
//           />
//           <TextField
//             label="Table Number"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={customerTableNumber}
//             onChange={(e) => setCustomerTableNumber(e.target.value)}
//           />
//           <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor:'#ab3434' }} onClick={placeOrder}>
//             Place Order
//           </Button>
//         </Paper>
//       </Box>
//     </div>
//   );
// }

// export default MenuSection;


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
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import image from '../food.png';

function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState({}); // Object to store cart items and their quantities
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerTableNumber, setCustomerTableNumber] = useState('');
  const [page, setPage] = useState(1); // Pagination state
  const itemsPerPage = 6;

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

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedItems = menuItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Full Menu
      </Typography>
      <Grid container spacing={3}>
        {paginatedItems.map((item) => (
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
                  Price: ₹{item.foodPrice.toFixed(2)}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton sx={{ color: '#ab3434' }} onClick={() => handleRemoveFromCart(item.id)} disabled={!cartItems[item.id]}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" style={{ margin: '0 10px' }}>
                    {cartItems[item.id] || 0}
                  </Typography>
                  <IconButton sx={{ color: 'green' }} onClick={() => handleAddToCart(item.id)} disabled={cartItems[item.id] >= 5}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination 
        count={Math.ceil(menuItems.length / itemsPerPage)} 
        page={page} 
        onChange={handleChangePage} 
        color="primary" 
        sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
      />

      {/* Cart Section */}
      <Box sx={{ mt: 4 }}>
        <Paper elevation={6} sx={{ p: 2, mb: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', border:'1px solid #ab3434' }}>
          <ShoppingCart sx={{ mr: 1 , color:'#ab3434'}} />
          <Typography variant="h5" gutterBottom> Cart
          </Typography>
        </Paper>
        <Paper elevation={12} sx={{ p: 2, mb: 2, border:'1px solid #ab3434' }}>
          <ul>
            {Object.entries(cartItems).filter(([itemId, quantity]) => quantity > 0).map(([itemId, quantity]) => { // Filter items with quantity > 0
              const menuItem = menuItems.find((item) => item.id === parseInt(itemId));
              return (
                <li key={itemId} style={{ listStyleType: 'none', marginBottom: '1rem' }}>
                  <Typography variant="body1">
                    {menuItem.foodName} - Quantity: {quantity} - Price: ₹{menuItem.foodPrice.toFixed(2)}
                  </Typography>
                </li>
              );
            })}
          </ul>
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            Total: ₹{getCartTotal().toFixed(2)}
          </Typography>
        </Paper>

        {/* Order Placement Section */}
        <Paper elevation={24} sx={{ p: 2 , mt:5, border:'1px solid #ab3434'}}>
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
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor:'#ab3434' }} onClick={placeOrder}>
            Place Order
          </Button>
        </Paper>
      </Box>
    </div>
  );
}

export default MenuSection;

