// ViewUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const storedUsername = localStorage.getItem('username');
                const storedPassword = localStorage.getItem('password');

                console.log(storedUsername);

                if (!storedUsername || !storedPassword) {
                    setError('User not logged in. Please login first.');
                    return;
                }

                const response = await axios.get('http://localhost:8082/user/customer', {
                    auth: {
                        username: storedUsername,
                        password: storedPassword,
                    },
                });

                setUsers(response.data);
                console.log(response.data);

            } catch (error) {
                setError('Error fetching users: ' + error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>View Users</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li> // Assuming 'name' is a property in your user data
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default ViewUsers;