import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Paper,
  Button,
  CircularProgress, // Import CircularProgress for the loader
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllOrders = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
      const storedRole = localStorage.getItem('role');

      if (!storedUsername || !storedPassword) {
        setError('User not logged in. Please login first.');
        setLoading(false); // Stop loading if user is not logged in
        return;
      }

      const response = await axios.get(`http://localhost:8082/customer`, {
        auth: {
          username: storedUsername,
          password: storedPassword,
        },
      });

      // Sort orders in descending order by ID (most recent first)
      const sortedCustomers = response.data.data.sort((a, b) => b.id - a.id);
      setCustomers(sortedCustomers);
    } catch (error) {
      setError('Error fetching customers: ' + error.message);
    } finally {
      setLoading(false); // Stop loading after fetching data (success or error)
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (!storedUsername || !storedPassword) {
        toast.error('User not logged in. Please login first.');
        return;
      }
      const id = orderId;

      await axios.delete(`http://localhost:8082/customer/${id}`, {
        auth: {
          username: storedUsername,
          password: storedPassword,
        },
      });

      // Remove the deleted order from the state
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== orderId)
      );

      toast.success('Order deleted successfully!');
    } catch (error) {
      toast.error('Error deleting order: ' + error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#ab3434', mb: 3 }}>
        Order History
      </Typography>
      {loading ? ( // Show loader while data is being fetched
        <CircularProgress sx={{ color: '#ab3434' }} />
      ) : error ? ( // Show error message if there's an error
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      ) : customers.length > 0 ? ( // Show orders if data is loaded
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          {customers.map((customer) => (
            <Paper
              key={customer.id}
              elevation={3}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                border: '1px solid #ab3434',
              }}
            >
              <Typography variant="h6" sx={{ color: '#ab3434', mb: 1 }}>
                Order ID: {customer.id}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Customer: {customer.customerName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Phone: {customer.customerPhoneNumber} | Table: {customer.customerTableNumber}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Order Items:
              </Typography>
              <List dense>
                {Array.from(
                  new Set(customer.orderItems.map((item) => item.foodName))
                ).map((foodName) => {
                  const quantity = customer.orderItems.filter(
                    (item) => item.foodName === foodName
                  ).length;
                  const foodPrice = customer.orderItems.find(
                    (item) => item.foodName === foodName
                  ).foodPrice;
                  return (
                    <ListItem key={foodName} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={`${foodName} (x${quantity})`}
                        secondary={`₹${(quantity * foodPrice).toFixed(2)}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Total: ₹{customer.totalPrice.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#ab3434', '&:hover': { backgroundColor: '#8b2c2c' } }}
                  onClick={() => handleDeleteOrder(customer.id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : ( // Show message if no orders are found
        <Typography variant="body2" align="center">
          No orders found.
        </Typography>
      )}
      <ToastContainer />
    </Box>
  );
};

export default AllOrders;