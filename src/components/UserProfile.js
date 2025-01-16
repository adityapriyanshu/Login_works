import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const ViewUsers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        const storedRole = localStorage.getItem('role');

        if (!storedUsername || !storedPassword) {
          setError('User not logged in. Please login first.');
          return;
        }

        const user = storedUsername.toLowerCase();

        const response = await axios.get(`http://localhost:8082/byUsername/${user}`, {
          auth: {
            username: storedUsername,
            password: storedPassword,
            role: storedRole,
          },
        });

        setCustomers(response.data.data);
      } catch (error) {
        setError('Error fetching customers: ' + error.message);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' , mt:10}}>
      <Typography variant="h5" gutterBottom>
        View Customers
      </Typography>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {customers.length > 0 ? (
        <List component="nav" aria-label="main mailbox folders">
          {customers.map((customer) => (
            <React.Fragment key={customer.id}>
              <ListItem>
                <ListItemText
                  primary={`Customer Name: ${customer.customerName}`}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Phone: {customer.customerPhoneNumber} | Table: {customer.customerTableNumber}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Order Items" />
              </ListItem>
              <List dense>
                {Array.from(
                  new Set(customer.orderItems.map((item) => item.foodName))
                ).map((foodName) => {
                  const quantity = customer.orderItems.filter(
                    (item) => item.foodName === foodName
                  ).length;
                  return (
                    <ListItem key={foodName}>
                      <ListItemText
                        primary={`${foodName} (x${quantity})`}
                        secondary={`$${(
                          quantity *
                          customer.orderItems.find(
                            (item) => item.foodName === foodName
                          ).foodPrice
                        ).toFixed(2)}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <ListItem>
                <ListItemText primary={`Total Price: $${customer.totalPrice}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body2">No customers found.</Typography>
      )}
    </Box>
  );
}

export default ViewUsers;