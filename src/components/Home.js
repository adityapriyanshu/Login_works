// Home.js
import React from 'react';

function Home() {
  const username = localStorage.getItem('username');

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      {/* Add components or content for the home page here */}
    </div>
  );
}

export default Home;