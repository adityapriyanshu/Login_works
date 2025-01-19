// // import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
// // import React from 'react'
// // import '@fontsource/cormorant/600.css';

// // const Navbar = () => {

// //     const handleLogout = () => {
// //         localStorage.removeItem('username');
// //         localStorage.removeItem('password');
// //         localStorage.removeItem('role');
// //         window.location.href = '/';
// //     }

// //     const handleLogoClick = () => {

// //         window.location.href = '/';
// //     }

// //     return (
// //         <Box sx={{ flexGrow: 1 }}>
// //             <AppBar elevation={12} position='fixed' sx={{ backgroundColor: '#ab3434' }}>
// //                 <Toolbar>
// //                     <Box sx={{ flexGrow: 1 }} />
// //                     <Typography onClick={handleLogoClick} variant='h5' component="div" sx={{ flexGrow: 1, fontFamily: "'Cormorant', 'serif'", fontStyle: 'italic', textAlign: 'start', ml: 20, cursor: 'pointer',fontSize:'4.5vh', letterSpacing:'1px' }}>
// //                         Gourmet Heaven
// //                     </Typography>
// //                     <Button color='inherit' href='/menu' sx={{ border: '1px solid white', mx: 1 }}>Menu</Button>
// //                     {localStorage.getItem('username') ?
                        
// //                         <>
// //                             <Button color='inherit' href='/my-orders' sx={{ border: '1px solid white', mx: 1 }}>My Orders</Button>
// //                             <Button color='inherit' onClick={handleLogout} sx={{ border: '1px solid white', mx: 1 }}>Logout</Button>
// //                         </> :
// //                         <Button color='inherit' href='/login' sx={{ border: '1px solid white', mx: 1 }}>Login</Button>
                        
// //                     }
// //                 </Toolbar>
// //             </AppBar>
// //         </Box>
// //     )
// // }

// // export default Navbar

// import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
// import React from 'react';
// import '@fontsource/cormorant/600.css';

// const Navbar = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('username');
//     localStorage.removeItem('password');
//     localStorage.removeItem('role');
//     window.location.href = '/';
//   };

//   const handleLogoClick = () => {
//     window.location.href = '/';
//   };

//   const username = localStorage.getItem('username');
//   const role = localStorage.getItem('role');

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar elevation={12} position="fixed" sx={{ backgroundColor: '#ab3434' }}>
//         <Toolbar>
//           <Box sx={{ flexGrow: 1 }} />
//           <Typography
//             onClick={handleLogoClick}
//             variant="h5"
//             component="div"
//             sx={{
//               flexGrow: 1,
//               fontFamily: "'Cormorant', 'serif'",
//               fontStyle: 'italic',
//               textAlign: 'start',
//               ml: 20,
//               cursor: 'pointer',
//               fontSize: '4.5vh',
//               letterSpacing: '1px',
//             }}
//           >
//             Gourmet Heaven
//           </Typography>
//           {/* MENU Button */}
//           <Button color="inherit" href="/menu" sx={{ border: '1px solid white', mx: 1 }}>
//             Menu
//           </Button>

//             {/* Check the role and show navbar */}
//           {username ? (
//             role === 'ROLE_CUSTOMER' ? (
//               // Show Menu, My Orders, and Logout for customers
//               <>
//                 <Button color="inherit" href="/my-orders" sx={{ border: '1px solid white', mx: 1 }}>
//                   My Orders
//                 </Button>
//                 <Button color="inherit" onClick={handleLogout} sx={{ border: '1px solid white', mx: 1 }}>
//                   Logout
//                 </Button>
//               </>
//             ) : role === 'ROLE_ADMIN' ? (
//               // Show Menu, All Orders, and Logout for admins
//               <>
//                 <Button color="inherit" href="/all-orders" sx={{ border: '1px solid white', mx: 1 }}>
//                   Orders
//                 </Button>
//                 <Button color="inherit" href="/admin" sx={{ border: '1px solid white', mx: 1 }}>
//                   Admin
//                 </Button>
//                 <Button color="inherit" onClick={handleLogout} sx={{ border: '1px solid white', mx: 1 }}>
//                   Logout
//                 </Button>
//               </>
//             ) : null
//           ) : (
//             // Show Login button if user is not logged in
//             <Button color="inherit" href="/login" sx={{ border: '1px solid white', mx: 1 }}>
//               Login
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '@fontsource/cormorant/600.css';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control drawer open/close
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if the screen is mobile

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  // Drawer content for mobile view
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" >
      <List >
        <ListItem button component="a" href="/menu" sx={{color:'#ab3434'}} >
          <ListItemText primary="Menu" />
        </ListItem>
        {username ? (
          role === 'ROLE_CUSTOMER' ? (
            <>
              <ListItem button component="a" href="/my-orders" sx={{color:'#ab3434'}}>
                <ListItemText primary="My Orders" />
              </ListItem>
              <ListItem button onClick={handleLogout} sx={{color:'#ab3434'}}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : role === 'ROLE_ADMIN' ? (
            <>
              <ListItem button component="a" href="/all-orders" sx={{color:'#ab3434'}}>
                <ListItemText primary="Orders" />
              </ListItem>
              <ListItem button component="a" href="/admin" sx={{color:'#ab3434'}}>
                <ListItemText primary="Admin" />
              </ListItem>
              <ListItem button onClick={handleLogout} sx={{color:'#ab3434'}}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : null
        ) : (
          <ListItem button component="a" href="/login" sx={{color:'#ab3434'}}>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={12} position="fixed" sx={{ backgroundColor: '#ab3434' }}>
        <Toolbar>
          {/* Hamburger Menu Icon for Mobile */}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            onClick={handleLogoClick}
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "'Cormorant', 'serif'",
              fontStyle: 'italic',
              textAlign: 'start',
              ml: isMobile ? 0 : 20,
              cursor: 'pointer',
              fontSize: '4.5vh',
              letterSpacing: '1px',
            }}
          >
            Gourmet Heaven
          </Typography>

          {/* Desktop View Buttons */}
          {!isMobile && (
            <>
              <Button color="inherit" href="/menu" sx={{ border: '1px solid white', mx: 1 }}>
                Menu
              </Button>
              {username ? (
                role === 'ROLE_CUSTOMER' ? (
                  <>
                    <Button color="inherit" href="/my-orders" sx={{ border: '1px solid white', mx: 1 }}>
                      My Orders
                    </Button>
                    <Button color="inherit" onClick={handleLogout} sx={{ border: '1px solid white', mx: 1 }}>
                      Logout
                    </Button>
                  </>
                ) : role === 'ROLE_ADMIN' ? (
                  <>
                    <Button color="inherit" href="/all-orders" sx={{ border: '1px solid white', mx: 1 }}>
                      Orders
                    </Button>
                    <Button color="inherit" href="/admin" sx={{ border: '1px solid white', mx: 1 }}>
                      Admin
                    </Button>
                    <Button color="inherit" onClick={handleLogout} sx={{ border: '1px solid white', mx: 1 }}>
                      Logout
                    </Button>
                  </>
                ) : null
              ) : (
                <Button color="inherit" href="/login" sx={{ border: '1px solid white', mx: 1 }}>
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Navbar;