// import React from 'react';
// import Grid from '@mui/material/Grid2';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';

// function AboutUs() {
//   return (
//     <div style={{ padding: '2rem',  backgroundColor: '#ab3434'}}>
//       <Grid container spacing={1} >
//         <Grid size={5} item xs={12} md={6}> 
//           <Card>
//             <CardMedia 
//               component="img" 
//               sx={{width: '100%', height: '400px', objectFit: 'cover'}} 
//               image="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
//               alt="Restaurant Image" 
//             />
//           </Card>
//         </Grid>
//         <Grid size={6} item xs={12} md={6}>
//           <CardContent sx={{ padding: '2rem' , color:'#ffffff'}}>
//             <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Cormorant', 'serif'", padding: '1rem'}}>
//               About Us
//             </Typography>
//             <Typography variant="body1" sx={{ fontFamily: "'Cormorant', 'serif'", padding: '1rem'}}>
//               We are passionate about providing our customers with the highest quality food and exceptional service. 
//               Our menu features a variety of dishes to satisfy every palate. 
//               We use only the freshest ingredients to create delicious and flavorful meals.
//             </Typography>
//           </CardContent>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default AboutUs;



import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function AboutUs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile

  return (
    <div style={{ padding: isMobile ? '1rem' : '2rem', backgroundColor: '#ab3434' }}>
      <Grid container spacing={isMobile ? 0 : 2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: isMobile ? '250px' : '400px', // Adjust height for mobile
                objectFit: 'cover',
              }}
              image="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Restaurant Image"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent
            sx={{
              padding: isMobile ? '1rem' : '2rem', // Adjust padding for mobile
              color: '#ffffff',
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontFamily: "'Cormorant', 'serif'",
                padding: isMobile ? '0.5rem' : '1rem', // Adjust padding for mobile
                fontSize: isMobile ? '2rem' : '2.5rem', // Adjust font size for mobile
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Cormorant', 'serif'",
                padding: isMobile ? '0.5rem' : '1rem', // Adjust padding for mobile
                fontSize: isMobile ? '1rem' : '1.2rem', // Adjust font size for mobile
              }}
            >
              We are passionate about providing our customers with the highest quality food and exceptional service. Our
              menu features a variety of dishes to satisfy every palate. We use only the freshest ingredients to create
              delicious and flavorful meals.
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutUs;