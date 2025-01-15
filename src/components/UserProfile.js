import React from 'react'

const UserProfile = () => {

    const name = localStorage.getItem('username');
  return (
    `Welcome, ${name}`
  )
}

export default UserProfile