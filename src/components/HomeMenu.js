// import React, { useEffect, useState } from 'react';
// import Grid from '@mui/material/Grid2';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button } from '@mui/material';
// import axios from 'axios';
// import image from './Images'
// const HomeMenu = () => { 
//     const [menuItems, setMenuItems] = useState([]);

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get('http://localhost:8082/menu/view'); 
//           setMenuItems(response.data.data.slice(0, 3)); // Get first 3 items for display
//         } catch (error) {
//           console.error('Error fetching menu items:', error);
//         }
//       };
//       fetchData();
//     }, []);

//     const handleOnclickMenu = () =>{
//       window.location.href="/menu"
//     }
  
//     return (
//       <div style={{ padding: '2rem' }}> 
//         <Typography color='black' variant="h4" align="center" gutterBottom>
//           Pick from variety of cuisines
//         </Typography>
//         <Grid container spacing={3} onClick={handleOnclickMenu} sx={{cursor:'pointer'}}>
//           {menuItems.map((item) => (
//             <Grid size={4} item xs={6} key={item.id}>
//               <Card elevation={8} sx={{ display: 'flex' }}>
//                 <CardMedia
//                   component="img"
//                   sx={{ width: 180, height:150 }}
//                   image={`${image}/${item.foodName}` || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'}
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h5" component="h2" mt={1}>
//                     {item.foodName}
//                   </Typography>
//                   <Typography gutterBottom variant="h6" component="h2" pl={1} mt={2}>
//                   ₹{item.foodPrice}.00
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//           <Button variant="contained" color="primary" sx={{backgroundColor:'#ab3434'}} href="/menu">
//             View Full Menu
//           </Button>
//         </div>
//       </div>
//     );
//   }
// export default HomeMenu;

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import axios from 'axios';

// Function to dynamically import images
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// Import all images from the Images directory
const images = importAll(require.context('./Images', false, /\.(png|jpe?g|svg)$/));

const HomeMenu = () => { 
  const [menuItems, setMenuItems] = useState([]);

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

  const handleOnclickMenu = () =>{
    window.location.href="/menu"
  }

  return (
    <div style={{ padding: '2rem' }}> 
      <Typography color='black' variant="h4" align="center" gutterBottom>
        Pick from variety of cuisines
      </Typography>
      <Grid container spacing={3} onClick={handleOnclickMenu} sx={{cursor:'pointer'}}>
        {menuItems.map((item) => (
          <Grid size={4} item xs={6} key={item.id}>
            <Card elevation={8} sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 180, height:150 }}
                image={images[`${item.foodName}.jpg`] || images[`${item.foodName}.png`] || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'}
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
        <Button variant="contained" color="primary" sx={{backgroundColor:'#ab3434'}} href="/menu">
          View Full Menu
        </Button>
      </div>
    </div>
  );
}

export default HomeMenu;