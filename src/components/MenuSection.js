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
// import Pagination from '@mui/material/Pagination';
// import ShoppingCart from '@mui/icons-material/ShoppingCart';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import image from '../food.png';

// function MenuSection() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState({}); // Object to store cart items and their quantities
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
//   const [customerTableNumber, setCustomerTableNumber] = useState('');
//   const [page, setPage] = useState(1); // Pagination state
//   const itemsPerPage = 6;


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


//   // Order placing button handler function
//   const placeOrder = async () => {
//     if (Object.keys(cartItems).length === 0) {
//       toast.error('Cart cannot be empty!', {
//         position: "top-center",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: "dark"
//       });
//       return;
//     }

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

//     }
//   };

//   const handleChangePage = (event, value) => {
//     setPage(value);
//   };

//   const paginatedItems = menuItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <ToastContainer />
//       <Typography variant="h4" align="center" gutterBottom>
//         Full Menu
//       </Typography>
//       <Grid container spacing={3}>
//         {paginatedItems.map((item) => (
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
//       <Pagination
//         count={Math.ceil(menuItems.length / itemsPerPage)}
//         page={page}
//         onChange={handleChangePage}
//         color="primary"
//         sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
//       />

//       {/* Cart Section */}
//       <Box sx={{ mt: 4 }}>
//         <Paper elevation={6} sx={{ p: 2, mb: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ab3434' }}>
//           <ShoppingCart sx={{ mr: 1, color: '#ab3434' }} />
//           <Typography variant="h5" gutterBottom> Cart
//           </Typography>
//         </Paper>
//         <Paper elevation={12} sx={{ p: 2, mb: 2, border: '1px solid #ab3434' }}>
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
//         <Paper elevation={24} sx={{ p: 2, mt: 5, border: '1px solid #ab3434' }}>
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
//           <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: '#ab3434' }} onClick={placeOrder}>
//             Place Order
//           </Button>
//         </Paper>
//       </Box>
//     </div>
//   );
// }

// export default MenuSection;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Grid from '@mui/material/Grid';
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
// import Pagination from '@mui/material/Pagination';
// import ShoppingCart from '@mui/icons-material/ShoppingCart';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function MenuSection() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
//   const [customerTableNumber, setCustomerTableNumber] = useState('');
//   const [page, setPage] = useState(1);
//   const [validationErrors, setValidationErrors] = useState({});
//   const itemsPerPage = 6;


//   // Function to dynamically import images
// const importAll = (r) => {
//   let images = {};
//   r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
//   return images;
// }

// // Import all images from the Images directory
// const images = importAll(require.context('./Images', false, /\.(png|jpe?g|svg)$/));

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
//           delete newCartItems[itemId];
//         }
//       }
//       return newCartItems;
//     });
//   };

//   const handleAddToCart = (itemId) => {
//     if(!localStorage.getItem('username')){
//       toast.error('Login into your account!')
//       return;
//     }
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
//     if(!localStorage.getItem('username')){
//       toast.error('Login into your account!')
//       return;
//     }

//     if (Object.keys(cartItems).length === 0) {
//       toast.error('Cart cannot be empty!', {
//         position: "top-center",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: "dark"
//       });
//       return;
//     }

//     const storedUsername = localStorage.getItem('username');
//     const storedPassword = localStorage.getItem('password');

//     if (!storedUsername || !storedPassword) {
//       console.error('User credentials not found in local storage.');
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
//       setCustomerName('');
//       setCustomerPhoneNumber('');
//       setCustomerTableNumber('');
//       setCartItems({});
//       setValidationErrors({});
//       toast.success('Order placed successfully!', {
//         position: "top-center",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: "dark"
//       });
//     } catch (error) {
//       console.error('Error placing order:', error);
//       if (error.response && error.response.data && error.response.data.data) {
//         setValidationErrors(error.response.data.data);
//       } else {
//         setValidationErrors({});
//       }
//     }
//   };

//   const handleChangePage = (event, value) => {
//     setPage(value);
//   };

//   const paginatedItems = menuItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   // Reuse the same styling as the Login form
//   const paperStyle = { padding: '20px  20px 30px 20px', height: 'auto', width: 380, margin: "20px auto", border: '1px solid #ab3434' };
//   const btnstyle = { margin: '15px 0', backgroundColor: '#ab3434' };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <ToastContainer />
//       <Typography variant="h4" align="center" gutterBottom>
//         Full Menu
//       </Typography>
//       <Grid container spacing={3}>
//         {paginatedItems.map((item) => (
//           <Grid item xs={12} md={6} key={item.id}>
//             <Card square variant="outlined" sx={{ display: 'flex', alignItems: 'center', width: '100%', border: '1px solid #ab3434', boxShadow: '3px 5px 5px #d9d7b6' }}>
//               <CardMedia
//                 component="img"
//                 sx={{ width: 150, height: 150, mr: 2 }}
//                 image={images[`${item.foodName}.jpg`] || images[`${item.foodName}.png`] ||'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'}
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
//       <Pagination
//         count={Math.ceil(menuItems.length / itemsPerPage)}
//         page={page}
//         onChange={handleChangePage}
//         color="primary"
//         sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
//       />

//       {/* Cart Section */}
//       <Paper elevation={24} style={paperStyle}>
//         <Grid align="center">
//           <ShoppingCart sx={{ mr: 1, color: '#ab3434' }} />
//           <Typography variant="h5" gutterBottom>Cart</Typography>
//         </Grid>
//         <ul style={{ padding: 0 }}>
//           {Object.entries(cartItems).filter(([itemId, quantity]) => quantity > 0).map(([itemId, quantity]) => {
//             const menuItem = menuItems.find((item) => item.id === parseInt(itemId));
//             return (
//               <li key={itemId} style={{ listStyleType: 'none', marginBottom: '1rem' }}>
//                 <Typography variant="body1">
//                   {menuItem.foodName} - Quantity: {quantity} - Price: ₹{menuItem.foodPrice.toFixed(2)}
//                 </Typography>
//               </li>
//             );
//           })}
//         </ul>
//         <Typography variant="h6" align="center" sx={{ mt: 2 }}>
//           Total: ₹{getCartTotal().toFixed(2)}
//         </Typography>
//       </Paper>

//       {/* Order Placement Section */}
//       <Paper elevation={24} style={paperStyle}>
//         <Grid align="center">
//           <Typography variant="h5" gutterBottom>Place Order</Typography>
//         </Grid>
//         <TextField
//           label="Customer Name"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           error={!!validationErrors.customerName}
//           helperText={validationErrors.customerName}
//         />
//         <TextField
//           label="Phone Number"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={customerPhoneNumber}
//           onChange={(e) => setCustomerPhoneNumber(e.target.value)}
//           error={!!validationErrors.customerPhoneNumber}
//           helperText={validationErrors.customerPhoneNumber}
//         />
//         <TextField
//           label="Table Number"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={customerTableNumber}
//           onChange={(e) => setCustomerTableNumber(e.target.value)}
//           error={!!validationErrors.customerTableNumber}
//           helperText={validationErrors.customerTableNumber}
//         />
//         <Button variant="contained" color="primary" fullWidth style={btnstyle} onClick={placeOrder}>
//           Place Order
//         </Button>
//       </Paper>
//     </div>
//   );
// }

// export default MenuSection;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
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
import Pagination from '@mui/material/Pagination';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your Pexels API key

function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerTableNumber, setCustomerTableNumber] = useState('');
  const [page, setPage] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const itemsPerPage = 6;

  // Function to dynamically import images
  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  };

  // Import all images from the Images directory
  const localImages = importAll(require.context('./Images', false, /\.(png|jpe?g|svg)$/));

  // Function to fetch image from Pexels API
  const fetchImageFromPexels = async (query) => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      return response.data.photos[0]?.src?.medium || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
    } catch (error) {
      console.error('Error fetching image from Pexels:', error);
      return 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
    }
  };

  // Function to get image URL (local or Pexels)
  const getImageUrl = async (foodName) => {
    // Check for local image first
    const localImageKey = Object.keys(localImages).find((key) =>
      key.toLowerCase().includes(foodName.toLowerCase())
    );

    if (localImageKey) {
      return localImages[localImageKey]; // Return local image if found
    }

    // If local image not found, fetch from Pexels
    const pexelsImageUrl = await fetchImageFromPexels(foodName);
    return pexelsImageUrl;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/menu/view');
        const itemsWithImages = await Promise.all(
          response.data.data.map(async (item) => {
            const imageUrl = await getImageUrl(item.foodName);
            return { ...item, imageUrl };
          })
        );
        setMenuItems(itemsWithImages);
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
          delete newCartItems[itemId];
        }
      }
      return newCartItems;
    });
  };

  const handleAddToCart = (itemId) => {
    if (!localStorage.getItem('username')) {
      toast.error('Login into your account!');
      return;
    }
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
    if (!localStorage.getItem('username')) {
      toast.error('Login into your account!');
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error('Cart cannot be empty!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (!storedUsername || !storedPassword) {
      console.error('User credentials not found in local storage.');
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
          Authorization: `Basic ${btoa(`${storedUsername}:${storedPassword}`)}`,
        },
      });
      console.log('Order placed successfully:', response.data);
      setCustomerName('');
      setCustomerPhoneNumber('');
      setCustomerTableNumber('');
      setCartItems({});
      setValidationErrors({});
      toast.success('Order placed successfully!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response && error.response.data && error.response.data.data) {
        setValidationErrors(error.response.data.data);
      } else {
        setValidationErrors({});
      }
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedItems = menuItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Reuse the same styling as the Login form
  const paperStyle = { padding: '20px  20px 30px 20px', height: 'auto', width: 380, margin: '20px auto', border: '1px solid #ab3434' };
  const btnstyle = { margin: '15px 0', backgroundColor: '#ab3434' };

  return (
    <div style={{ padding: '2rem' }}>
      <ToastContainer />
      <Typography variant="h4" align="center" gutterBottom>
        Full Menu
      </Typography>
      <Grid container spacing={3}>
        {paginatedItems.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card square variant="outlined" sx={{ display: 'flex', alignItems: 'center', width: '100%', border: '1px solid #ab3434', boxShadow: '3px 5px 5px #d9d7b6' }}>
              <CardMedia
                component="img"
                sx={{ width: 150, height: 150, mr: 2 }}
                image={item.imageUrl}
                alt={item.foodName}
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
      <Paper elevation={24} style={paperStyle}>
        <Grid align="center">
          <ShoppingCart sx={{ mr: 1, color: '#ab3434' }} />
          <Typography variant="h5" gutterBottom>Cart</Typography>
        </Grid>
        <ul style={{ padding: 0 }}>
          {Object.entries(cartItems).filter(([itemId, quantity]) => quantity > 0).map(([itemId, quantity]) => {
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
      <Paper elevation={24} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5" gutterBottom>Place Order</Typography>
        </Grid>
        <TextField
          label="Customer Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          error={!!validationErrors.customerName}
          helperText={validationErrors.customerName}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerPhoneNumber}
          onChange={(e) => setCustomerPhoneNumber(e.target.value)}
          error={!!validationErrors.customerPhoneNumber}
          helperText={validationErrors.customerPhoneNumber}
        />
        <TextField
          label="Table Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerTableNumber}
          onChange={(e) => setCustomerTableNumber(e.target.value)}
          error={!!validationErrors.customerTableNumber}
          helperText={validationErrors.customerTableNumber}
        />
        <Button variant="contained" color="primary" fullWidth style={btnstyle} onClick={placeOrder}>
          Place Order
        </Button>
      </Paper>
    </div>
  );
}

export default MenuSection;