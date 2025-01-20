// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AdminPage = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [openAddAdminDialog, setOpenAddAdminDialog] = useState(false);
//   const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [selectedMenuItem, setSelectedMenuItem] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [foodName, setFoodName] = useState('');
//   const [foodPrice, setFoodPrice] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});
//   const [imageFile, setImageFile] = useState(null); // For image upload

//   // Fetch menu items on component mount
//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   const fetchMenuItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8082/menu/view');
//       setMenuItems(response.data.data);
//     } catch (error) {
//       toast.error('Error fetching menu items: ' + error.message);
//     }
//   };

//   // Add Admin Dialog
//   const handleAddAdminClick = () => {
//     setOpenAddAdminDialog(true);
//   };

//   const handleAddAdminClose = () => {
//     setOpenAddAdminDialog(false);
//     setUsername('');
//     setPassword('');
//     setValidationErrors({});
//   };

//   const handleAddAdminSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       const response = await axios.post(
//         'http://localhost:8082/user/adduser',
//         {
//           username,
//           password,
//           roles: 'ROLE_ADMIN',
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Admin added successfully!');
//       handleAddAdminClose();
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 400) {
//           // Handle validation errors
//           setValidationErrors(error.response.data.data);
//         } else if (error.response.status === 409) {
//           // Handle username already exists error
//           setValidationErrors({ username: error.response.data.status });
//         } else {
//           toast.error('Error adding admin: ' + error.response.data.status);
//         }
//       } else {
//         toast.error('Error adding admin: ' + error.message);
//       }
//     }
//   };

//   // Add Item Dialog
//   const handleAddItemClick = () => {
//     setOpenAddItemDialog(true);
//     setImageFile(null); // Clear image file when dialog opens
//   };

//   const handleAddItemClose = () => {
//     setOpenAddItemDialog(false);
//     setFoodName('');
//     setFoodPrice('');
//     setValidationErrors({});
//     setImageFile(null);
//   };

//   const handleAddItemSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       // Save image locally
//       if (imageFile) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const base64Image = e.target.result;
//           const imageName = `${foodName.replace(/\s+/g, '-').toLowerCase()}.png`; // Rename image
//           const imagePath = `/images/${imageName}`;

//           // Save image to public/images folder (mock implementation)
//           console.log('Image saved locally:', imagePath);
//         };
//         reader.readAsDataURL(imageFile);
//       }

//       const response = await axios.post(
//         'http://localhost:8082/menu/add',
//         {
//           foodName,
//           foodPrice,
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Menu item added successfully!');
//       fetchMenuItems(); // Refresh menu items
//       handleAddItemClose();
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setValidationErrors(error.response.data.data);
//       } else {
//         toast.error('Error adding menu item: ' + error.message);
//       }
//     }
//   };

//   // Update Menu Item Dialog
//   const handleUpdateClick = (menuItem) => {
//     setSelectedMenuItem(menuItem);
//     setFoodName(menuItem.foodName);
//     setFoodPrice(menuItem.foodPrice);
//     setOpenUpdateDialog(true);
//     setImageFile(null); // Clear image file when dialog opens
//   };

//   const handleUpdateClose = () => {
//     setOpenUpdateDialog(false);
//     setSelectedMenuItem(null);
//     setFoodName('');
//     setFoodPrice('');
//     setValidationErrors({});
//     setImageFile(null);
//   };

//   const handleUpdateSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       // Save image locally
//       if (imageFile) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const base64Image = e.target.result;
//           const imageName = `${foodName.replace(/\s+/g, '-').toLowerCase()}.png`; // Rename image
//           const imagePath = `/images/${imageName}`;

//           // Save image to public/images folder (mock implementation)
//           console.log('Image saved locally:', imagePath);
//         };
//         reader.readAsDataURL(imageFile);
//       }

//       await axios.put(
//         `http://localhost:8082/menu/update/${selectedMenuItem.id}`,
//         {
//           foodName,
//           foodPrice,
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Menu item updated successfully!');
//       fetchMenuItems(); // Refresh menu items
//       handleUpdateClose();
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setValidationErrors(error.response.data.data);
//       } else {
//         toast.error('Error updating menu item: ' + error.message);
//       }
//     }
//   };

//   // Delete Menu Item
//   const handleDeleteClick = async (menuItemId) => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       await axios.delete(`http://localhost:8082/menu/delete/${menuItemId}`, {
//         auth: {
//           username: storedUsername,
//           password: storedPassword,
//         },
//       });

//       toast.success('Menu item deleted successfully!');
//       fetchMenuItems(); // Refresh menu items
//     } catch (error) {
//       toast.error('Error deleting menu item: ' + error.message);
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Admin Page
//       </Typography>

//       {/* Add Admin and Add Item Buttons */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
//         <Button variant="contained" color="primary" onClick={handleAddAdminClick}>
//           Add Admin
//         </Button>
//         <Button variant="contained" color="secondary" onClick={handleAddItemClick}>
//           Add Item
//         </Button>
//       </Box>

//       {/* Add Admin Dialog */}
//       <Dialog open={openAddAdminDialog} onClose={handleAddAdminClose}>
//         <DialogTitle>Add Admin</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Username"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             error={!!validationErrors.username}
//             helperText={validationErrors.username}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             error={!!validationErrors.password}
//             helperText={validationErrors.password}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddAdminClose}>Cancel</Button>
//           <Button onClick={handleAddAdminSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Item Dialog */}
//       <Dialog open={openAddItemDialog} onClose={handleAddItemClose}>
//         <DialogTitle>Add Menu Item</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Food Name"
//             fullWidth
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             error={!!validationErrors.foodName}
//             helperText={validationErrors.foodName}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Food Price"
//             fullWidth
//             value={foodPrice}
//             onChange={(e) => setFoodPrice(e.target.value)}
//             error={!!validationErrors.foodPrice}
//             helperText={validationErrors.foodPrice}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ marginTop: '16px' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddItemClose}>Cancel</Button>
//           <Button onClick={handleAddItemSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Menu Items Grid */}
//       <Grid container spacing={3}>
//         {menuItems.map((menuItem) => (
//           <Grid item xs={12} sm={6} key={menuItem.id}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <img
//                   src={`/images/${menuItem.foodName.replace(/\s+/g, '-').toLowerCase()}.png`}
//                   alt={menuItem.foodName}
//                   style={{ width: 100, height: 100, marginRight: 16 }}
//                   onError={(e) => {
//                     e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'; // Fallback image
//                   }}
//                 />
//                 <Box>
//                   <Typography variant="h6">{menuItem.foodName}</Typography>
//                   <Typography variant="body1">₹{menuItem.foodPrice.toFixed(2)}</Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ mr: 1 }}
//                   onClick={() => handleUpdateClick(menuItem)}
//                 >
//                   Update
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => handleDeleteClick(menuItem.id)}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Update Menu Item Dialog */}
//       <Dialog open={openUpdateDialog} onClose={handleUpdateClose}>
//         <DialogTitle>Update Menu Item</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Food Name"
//             fullWidth
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             error={!!validationErrors.foodName}
//             helperText={validationErrors.foodName}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Food Price"
//             fullWidth
//             value={foodPrice}
//             onChange={(e) => setFoodPrice(e.target.value)}
//             error={!!validationErrors.foodPrice}
//             helperText={validationErrors.foodPrice}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ marginTop: '16px' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleUpdateClose}>Cancel</Button>
//           <Button onClick={handleUpdateSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Toast Container */}
//       <ToastContainer />
//     </Box>
//   );
// };

// export default AdminPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PEXELS_API_KEY = 'FdMFbn8GyN0ud5DoVrGCbgc79osckWiESupQuC7ipZmFfDS301HCBO2V';

// const AdminPage = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [openAddAdminDialog, setOpenAddAdminDialog] = useState(false);
//   const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [selectedMenuItem, setSelectedMenuItem] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [foodName, setFoodName] = useState('');
//   const [foodPrice, setFoodPrice] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   const fetchMenuItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8082/menu/view');
//       const itemsWithImages = await Promise.all(
//         response.data.data.map(async (item) => {
//           const imageUrl = await fetchImageFromPexels(item.foodName);
//           return { ...item, imageUrl };
//         })
//       );
//       setMenuItems(itemsWithImages);
//     } catch (error) {
//       toast.error('Error fetching menu items: ' + error.message);
//     }
//   };

//   const fetchImageFromPexels = async (query) => {
//     try {
//       const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
//         headers: {
//           Authorization: PEXELS_API_KEY,
//         },
//       });
//       return response.data.photos[0]?.src?.medium || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
//     } catch (error) {
//       console.error('Error fetching image from Pexels:', error);
//       return 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
//     }
//   };

//   const handleAddAdminClick = () => {
//     setOpenAddAdminDialog(true);
//   };

//   const handleAddAdminClose = () => {
//     setOpenAddAdminDialog(false);
//     setUsername('');
//     setPassword('');
//     setValidationErrors({});
//   };

//   const handleAddAdminSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       const response = await axios.post(
//         'http://localhost:8082/user/adduser',
//         {
//           username,
//           password,
//           roles: 'ROLE_ADMIN',
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Admin added successfully!');
//       handleAddAdminClose();
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 400) {
//           setValidationErrors(error.response.data.data);
//         } else if (error.response.status === 409) {
//           setValidationErrors({ username: error.response.data.status });
//         } else {
//           toast.error('Error adding admin: ' + error.response.data.status);
//         }
//       } else {
//         toast.error('Error adding admin: ' + error.message);
//       }
//     }
//   };

//   const handleAddItemClick = () => {
//     setOpenAddItemDialog(true);
//     setImageFile(null);
//   };

//   const handleAddItemClose = () => {
//     setOpenAddItemDialog(false);
//     setFoodName('');
//     setFoodPrice('');
//     setValidationErrors({});
//     setImageFile(null);
//   };

//   const handleAddItemSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       const imageUrl = await fetchImageFromPexels(foodName);

//       const response = await axios.post(
//         'http://localhost:8082/menu/add',
//         {
//           foodName,
//           foodPrice,
//           imageUrl,
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Menu item added successfully!');
//       fetchMenuItems();
//       handleAddItemClose();
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setValidationErrors(error.response.data.data);
//       } else {
//         toast.error('Error adding menu item: ' + error.message);
//       }
//     }
//   };

//   const handleUpdateClick = (menuItem) => {
//     setSelectedMenuItem(menuItem);
//     setFoodName(menuItem.foodName);
//     setFoodPrice(menuItem.foodPrice);
//     setOpenUpdateDialog(true);
//     setImageFile(null);
//   };

//   const handleUpdateClose = () => {
//     setOpenUpdateDialog(false);
//     setSelectedMenuItem(null);
//     setFoodName('');
//     setFoodPrice('');
//     setValidationErrors({});
//     setImageFile(null);
//   };

//   const handleUpdateSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       const imageUrl = await fetchImageFromPexels(foodName);

//       await axios.put(
//         `http://localhost:8082/menu/update/${selectedMenuItem.id}`,
//         {
//           foodName,
//           foodPrice,
//           imageUrl,
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Menu item updated successfully!');
//       fetchMenuItems();
//       handleUpdateClose();
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setValidationErrors(error.response.data.data);
//       } else {
//         toast.error('Error updating menu item: ' + error.message);
//       }
//     }
//   };

//   const handleDeleteClick = async (menuItemId) => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       await axios.delete(`http://localhost:8082/menu/delete/${menuItemId}`, {
//         auth: {
//           username: storedUsername,
//           password: storedPassword,
//         },
//       });

//       toast.success('Menu item deleted successfully!');
//       fetchMenuItems();
//     } catch (error) {
//       toast.error('Error deleting menu item: ' + error.message);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Admin Page
//       </Typography>

//       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
//         <Button variant="contained" color="primary" onClick={handleAddAdminClick}>
//           Add Admin
//         </Button>
//         <Button variant="contained" color="secondary" onClick={handleAddItemClick}>
//           Add Item
//         </Button>
//       </Box>

//       <Dialog open={openAddAdminDialog} onClose={handleAddAdminClose}>
//         <DialogTitle>Add Admin</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Username"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             error={!!validationErrors.username}
//             helperText={validationErrors.username}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             error={!!validationErrors.password}
//             helperText={validationErrors.password}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddAdminClose}>Cancel</Button>
//           <Button onClick={handleAddAdminSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openAddItemDialog} onClose={handleAddItemClose}>
//         <DialogTitle>Add Menu Item</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Food Name"
//             fullWidth
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             error={!!validationErrors.foodName}
//             helperText={validationErrors.foodName}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Food Price"
//             fullWidth
//             value={foodPrice}
//             onChange={(e) => setFoodPrice(e.target.value)}
//             error={!!validationErrors.foodPrice}
//             helperText={validationErrors.foodPrice}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ marginTop: '16px' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddItemClose}>Cancel</Button>
//           <Button onClick={handleAddItemSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       <Grid container spacing={3}>
//         {menuItems.map((menuItem) => (
//           <Grid item xs={12} sm={6} key={menuItem.id}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <img
//                   src={menuItem.imageUrl}
//                   alt={menuItem.foodName}
//                   style={{ width: 100, height: 100, marginRight: 16 }}
//                   onError={(e) => {
//                     e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
//                   }}
//                 />
//                 <Box>
//                   <Typography variant="h6">{menuItem.foodName}</Typography>
//                   <Typography variant="body1">₹{menuItem.foodPrice.toFixed(2)}</Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ mr: 1 }}
//                   onClick={() => handleUpdateClick(menuItem)}
//                 >
//                   Update
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => handleDeleteClick(menuItem.id)}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog open={openUpdateDialog} onClose={handleUpdateClose}>
//         <DialogTitle>Update Menu Item</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Food Name"
//             fullWidth
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             error={!!validationErrors.foodName}
//             helperText={validationErrors.foodName}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Food Price"
//             fullWidth
//             value={foodPrice}
//             onChange={(e) => setFoodPrice(e.target.value)}
//             error={!!validationErrors.foodPrice}
//             helperText={validationErrors.foodPrice}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ marginTop: '16px' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleUpdateClose}>Cancel</Button>
//           <Button onClick={handleUpdateSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       <ToastContainer />
//     </Box>
//   );
// };

// export default AdminPage;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PEXELS_API_KEY = 'FdMFbn8GyN0ud5DoVrGCbgc79osckWiESupQuC7ipZmFfDS301HCBO2V';

// const AdminPage = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [openAddAdminDialog, setOpenAddAdminDialog] = useState(false);
//   const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [selectedMenuItem, setSelectedMenuItem] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [foodName, setFoodName] = useState('');
//   const [foodPrice, setFoodPrice] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});
//   const [imageFile, setImageFile] = useState(null);

//   // Function to dynamically import images
//   const importAll = (r) => {
//     let images = {};
//     r.keys().forEach((item, index) => {
//       images[item.replace('./', '')] = r(item);
//     });
//     return images;
//   };

//   // Import all images from the Images directory
//   const localImages = importAll(require.context('./Images', false, /\.(png|jpe?g|svg)$/));

//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   const fetchMenuItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8082/menu/view');
//       const itemsWithImages = await Promise.all(
//         response.data.data.map(async (item) => {
//           const imageUrl = await fetchImageFromPexels(item.foodName);
//           return { ...item, imageUrl };
//         })
//       );
//       setMenuItems(itemsWithImages);
//     } catch (error) {
//       toast.error('Error fetching menu items: ' + error.message);
//     }
//   };

//   const fetchImageFromPexels = async (query) => {
//     // Check for local image first
//     const localImageKey = Object.keys(localImages).find((key) =>
//       key.toLowerCase().includes(query.toLowerCase())
//     );

//     if (localImageKey) {
//       return localImages[localImageKey]; // Return local image if found
//     }

//     // If local image not found, fetch from Pexels
//     try {
//       const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
//         headers: {
//           Authorization: PEXELS_API_KEY,
//         },
//       });
//       return response.data.photos[0]?.src?.medium || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
//     } catch (error) {
//       console.error('Error fetching image from Pexels:', error);
//       return 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
//     }
//   };

//   const handleAddAdminClick = () => {
//     setOpenAddAdminDialog(true);
//   };

//   const handleAddAdminClose = () => {
//     setOpenAddAdminDialog(false);
//     setUsername('');
//     setPassword('');
//     setValidationErrors({});
//   };

//   const handleAddAdminSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       const response = await axios.post(
//         'http://localhost:8082/user/adduser',
//         {
//           username,
//           password,
//           roles: 'ROLE_ADMIN',
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Admin added successfully!');
//       handleAddAdminClose();
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 400) {
//           setValidationErrors(error.response.data.data);
//         } else if (error.response.status === 409) {
//           setValidationErrors({ username: error.response.data.status });
//         } else {
//           toast.error('Error adding admin: ' + error.response.data.status);
//         }
//       } else {
//         toast.error('Error adding admin: ' + error.message);
//       }
//     }
//   };

//   const handleAddItemClick = () => {
//     setOpenAddItemDialog(true);
//     setImageFile(null);
//   };

//   const handleAddItemClose = () => {
//     setOpenAddItemDialog(false);
//     setFoodName('');
//     setFoodPrice('');
//     setValidationErrors({});
//     setImageFile(null);
//   };

//   const handleAddItemSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       const imageUrl = await fetchImageFromPexels(foodName);

//       const response = await axios.post(
//         'http://localhost:8082/menu/add',
//         {
//           foodName,
//           foodPrice,
//           imageUrl,
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Menu item added successfully!');
//       fetchMenuItems();
//       handleAddItemClose();
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setValidationErrors(error.response.data.data);
//       } else {
//         toast.error('Error adding menu item: ' + error.message);
//       }
//     }
//   };

//   const handleUpdateClick = (menuItem) => {
//     setSelectedMenuItem(menuItem);
//     setFoodName(menuItem.foodName);
//     setFoodPrice(menuItem.foodPrice);
//     setOpenUpdateDialog(true);
//     setImageFile(null);
//   };

//   const handleUpdateClose = () => {
//     setOpenUpdateDialog(false);
//     setSelectedMenuItem(null);
//     setFoodName('');
//     setFoodPrice('');
//     setValidationErrors({});
//     setImageFile(null);
//   };

//   const handleUpdateSubmit = async () => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       const imageUrl = await fetchImageFromPexels(foodName);

//       await axios.put(
//         `http://localhost:8082/menu/update/${selectedMenuItem.id}`,
//         {
//           foodName,
//           foodPrice,
//           imageUrl,
//         },
//         {
//           auth: {
//             username: storedUsername,
//             password: storedPassword,
//           },
//         }
//       );

//       toast.success('Menu item updated successfully!');
//       fetchMenuItems();
//       handleUpdateClose();
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setValidationErrors(error.response.data.data);
//       } else {
//         toast.error('Error updating menu item: ' + error.message);
//       }
//     }
//   };

//   const handleDeleteClick = async (menuItemId) => {
//     try {
//       const storedUsername = localStorage.getItem('username');
//       const storedPassword = localStorage.getItem('password');

//       if (!storedUsername || !storedPassword) {
//         toast.error('User not logged in. Please login first.');
//         return;
//       }

//       await axios.delete(`http://localhost:8082/menu/delete/${menuItemId}`, {
//         auth: {
//           username: storedUsername,
//           password: storedPassword,
//         },
//       });

//       toast.success('Menu item deleted successfully!');
//       fetchMenuItems();
//     } catch (error) {
//       toast.error('Error deleting menu item: ' + error.message);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Admin Page
//       </Typography>

//       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
//         <Button variant="contained" color="primary" onClick={handleAddAdminClick}>
//           Add Admin
//         </Button>
//         <Button variant="contained" color="secondary" onClick={handleAddItemClick}>
//           Add Item
//         </Button>
//       </Box>

//       <Dialog open={openAddAdminDialog} onClose={handleAddAdminClose}>
//         <DialogTitle>Add Admin</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Username"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             error={!!validationErrors.username}
//             helperText={validationErrors.username}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             error={!!validationErrors.password}
//             helperText={validationErrors.password}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddAdminClose}>Cancel</Button>
//           <Button onClick={handleAddAdminSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openAddItemDialog} onClose={handleAddItemClose}>
//         <DialogTitle>Add Menu Item</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Food Name"
//             fullWidth
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             error={!!validationErrors.foodName}
//             helperText={validationErrors.foodName}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Food Price"
//             fullWidth
//             value={foodPrice}
//             onChange={(e) => setFoodPrice(e.target.value)}
//             error={!!validationErrors.foodPrice}
//             helperText={validationErrors.foodPrice}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ marginTop: '16px' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddItemClose}>Cancel</Button>
//           <Button onClick={handleAddItemSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       <Grid container spacing={3}>
//         {menuItems.map((menuItem) => (
//           <Grid item xs={12} sm={6} key={menuItem.id}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <img
//                   src={menuItem.imageUrl}
//                   alt={menuItem.foodName}
//                   style={{ width: 100, height: 100, marginRight: 16 }}
//                   onError={(e) => {
//                     e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
//                   }}
//                 />
//                 <Box>
//                   <Typography variant="h6">{menuItem.foodName}</Typography>
//                   <Typography variant="body1">₹{menuItem.foodPrice.toFixed(2)}</Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ mr: 1 }}
//                   onClick={() => handleUpdateClick(menuItem)}
//                 >
//                   Update
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => handleDeleteClick(menuItem.id)}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog open={openUpdateDialog} onClose={handleUpdateClose}>
//         <DialogTitle>Update Menu Item</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Food Name"
//             fullWidth
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             error={!!validationErrors.foodName}
//             helperText={validationErrors.foodName}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Food Price"
//             fullWidth
//             value={foodPrice}
//             onChange={(e) => setFoodPrice(e.target.value)}
//             error={!!validationErrors.foodPrice}
//             helperText={validationErrors.foodPrice}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ marginTop: '16px' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleUpdateClose}>Cancel</Button>
//           <Button onClick={handleUpdateSubmit}>Submit</Button>
//         </DialogActions>
//       </Dialog>

//       <ToastContainer />
//     </Box>
//   );
// };

// export default AdminPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PEXELS_API_KEY = 'FdMFbn8GyN0ud5DoVrGCbgc79osckWiESupQuC7ipZmFfDS301HCBO2V';

const AdminPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [openAddAdminDialog, setOpenAddAdminDialog] = useState(false);
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

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

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8082/menu/view');
      const itemsWithImages = await Promise.all(
        response.data.data.map(async (item) => {
          const imageUrl = await fetchImageFromPexels(item.foodName);
          return { ...item, imageUrl };
        })
      );
      setMenuItems(itemsWithImages);
    } catch (error) {
      toast.error('Error fetching menu items: ' + error.message);
    }
  };

  const fetchImageFromPexels = async (query) => {
    // Check for local image first
    const localImageKey = Object.keys(localImages).find((key) =>
      key.toLowerCase().includes(query.toLowerCase())
    );

    if (localImageKey) {
      return localImages[localImageKey]; // Return local image if found
    }

    // If local image not found, fetch from Pexels
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

  const handleAddAdminClick = () => {
    setOpenAddAdminDialog(true);
  };

  const handleAddAdminClose = () => {
    setOpenAddAdminDialog(false);
    setUsername('');
    setPassword('');
    setValidationErrors({});
  };

  const handleAddAdminSubmit = async () => {
    try {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (!storedUsername || !storedPassword) {
        toast.error('User not logged in. Please login first.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8082/user/adduser',
        {
          username,
          password,
          roles: 'ROLE_ADMIN',
        },
        {
          auth: {
            username: storedUsername,
            password: storedPassword,
          },
        }
      );

      toast.success('Admin added successfully!');
      handleAddAdminClose();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setValidationErrors(error.response.data.data);
        } else if (error.response.status === 409) {
          setValidationErrors({ username: error.response.data.status });
        } else {
          toast.error('Error adding admin: ' + error.response.data.status);
        }
      } else {
        toast.error('Error adding admin: ' + error.message);
      }
    }
  };

  const handleAddItemClick = () => {
    setOpenAddItemDialog(true);
  };

  const handleAddItemClose = () => {
    setOpenAddItemDialog(false);
    setFoodName('');
    setFoodPrice('');
    setValidationErrors({});
  };

  const handleAddItemSubmit = async () => {
    try {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (!storedUsername || !storedPassword) {
        toast.error('User not logged in. Please login first.');
        return;
      }

      const imageUrl = await fetchImageFromPexels(foodName);

      const response = await axios.post(
        'http://localhost:8082/menu/add',
        {
          foodName,
          foodPrice,
          imageUrl,
        },
        {
          auth: {
            username: storedUsername,
            password: storedPassword,
          },
        }
      );

      toast.success('Menu item added successfully!');
      fetchMenuItems();
      handleAddItemClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setValidationErrors(error.response.data.data);
      } else {
        toast.error('Error adding menu item: ' + error.message);
      }
    }
  };

  const handleUpdateClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setFoodName(menuItem.foodName);
    setFoodPrice(menuItem.foodPrice);
    setOpenUpdateDialog(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdateDialog(false);
    setSelectedMenuItem(null);
    setFoodName('');
    setFoodPrice('');
    setValidationErrors({});
  };

  const handleUpdateSubmit = async () => {
    try {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (!storedUsername || !storedPassword) {
        toast.error('User not logged in. Please login first.');
        return;
      }

      const imageUrl = await fetchImageFromPexels(foodName);

      await axios.put(
        `http://localhost:8082/menu/update/${selectedMenuItem.id}`,
        {
          foodName,
          foodPrice,
          imageUrl,
        },
        {
          auth: {
            username: storedUsername,
            password: storedPassword,
          },
        }
      );

      toast.success('Menu item updated successfully!');
      fetchMenuItems();
      handleUpdateClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setValidationErrors(error.response.data.data);
      } else {
        toast.error('Error updating menu item: ' + error.message);
      }
    }
  };

  const handleDeleteClick = async (menuItemId) => {
    try {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (!storedUsername || !storedPassword) {
        toast.error('User not logged in. Please login first.');
        return;
      }

      await axios.delete(`http://localhost:8082/menu/delete/${menuItemId}`, {
        auth: {
          username: storedUsername,
          password: storedPassword,
        },
      });

      toast.success('Menu item deleted successfully!');
      fetchMenuItems();
    } catch (error) {
      toast.error('Error deleting menu item: ' + error.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom mt={5}>
        Admin Page
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={handleAddAdminClick}>
          Add Admin
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAddItemClick}>
          Add Item
        </Button>
      </Box>

      <Dialog open={openAddAdminDialog} onClose={handleAddAdminClose}>
        <DialogTitle>Add Admin</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!validationErrors.username}
            helperText={validationErrors.username}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddAdminClose}>Cancel</Button>
          <Button onClick={handleAddAdminSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddItemDialog} onClose={handleAddItemClose}>
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Food Name"
            fullWidth
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            error={!!validationErrors.foodName}
            helperText={validationErrors.foodName}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Food Price"
            fullWidth
            value={foodPrice}
            onChange={(e) => setFoodPrice(e.target.value)}
            error={!!validationErrors.foodPrice}
            helperText={validationErrors.foodPrice}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddItemClose}>Cancel</Button>
          <Button onClick={handleAddItemSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {menuItems.map((menuItem) => (
          <Grid item xs={12} sm={6} key={menuItem.id}>
            <Paper elevation={6} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    overflow: 'hidden',
                    borderRadius: '8px',
                    marginRight: 2,
                  }}
                >
                  <img
                    src={menuItem.imageUrl}
                    alt={menuItem.foodName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // Ensures the image covers the container without stretching
                    }}
                    onError={(e) => {
                      e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6">{menuItem.foodName}</Typography>
                  <Typography variant="body1">₹{menuItem.foodPrice.toFixed(2)}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() => handleUpdateClick(menuItem)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteClick(menuItem.id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openUpdateDialog} onClose={handleUpdateClose}>
        <DialogTitle>Update Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Food Name"
            fullWidth
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            error={!!validationErrors.foodName}
            helperText={validationErrors.foodName}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Food Price"
            fullWidth
            value={foodPrice}
            onChange={(e) => setFoodPrice(e.target.value)}
            error={!!validationErrors.foodPrice}
            helperText={validationErrors.foodPrice}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handleUpdateSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default AdminPage;