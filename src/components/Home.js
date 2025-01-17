// import React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// function HomeBody() {
//   return (
//     <div style={{ 
//         // backgroundImage: `url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`, 
//         backgroundImage: `url('https://espacendesign.com/wp-content/uploads/2024/09/Restaurant-interior-designer-low-budget-1-scaled.webp')`, 
//         backgroundSize: 'cover', 
//         backgroundPosition: 'center', 
//         minHeight: '80vh' 
//       }}>
//       <Box sx={{ 
//           display: 'flex', 
//           flexDirection: 'column', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '100%' 
//         }}>
//         <Typography variant="h2" color="white" sx={{ mb: 1, mt:20 , fontWeight:'5rem'}}>
//           Welcome to Gourmet Heaven
//         </Typography>
//         <Typography variant="body1" color="white" sx={{ textAlign: 'center' }}>
//           Your friendly neighborhood restaurant serving delicious food.
//         </Typography>
//       </Box>
//     </div>
//   );
// }

// export default HomeBody;

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/cormorant/700.css';
import '@fontsource/cormorant/700-italic.css';

const HomeBody = () => {
  return (
    <div style={{ 
        // backgroundImage: `url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundImage: `url('https://espacendesign.com/wp-content/uploads/2024/09/Restaurant-interior-designer-low-budget-1-scaled.webp')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '85vh', 
        position: 'relative' 
      }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.35)'
      }}></div>
      <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%', 
          position: 'relative', 
          zIndex: 1 
        }}>
        <Typography variant="h2" color="white" sx={{ mb: 1, mt: 20, fontFamily: "'Cormorant', 'serif'", fontWeight: 700, fontStyle: 'italic', fontSize:'13vh'}}>
          Welcome to Gourmet Heaven
        </Typography>
        <Typography variant="body1" color="white" sx={{ textAlign: 'center' }}>
          Your friendly neighbourhood restaurant serving delicious food.
        </Typography> 
      </Box>
    </div>
  );
}

export default HomeBody;
