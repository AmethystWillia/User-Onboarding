// Import dependencies
import React from 'react';

// Import CSS
import './App.css';

// Exported component
function User({ details }) {
    // Loading text
    if (!details) {
        return <h3>Fetching user info...</h3>
    }

    // Render content
    return (
        <div className='user container'>
            <h2>{`${details.first_name} ${details.last_name}`}</h2>
            <p><strong>Email:</strong> {details.email}</p>
            <p><strong>Password:</strong> {details.password}</p>
            <p><strong>Agreed to Terms:</strong> Yes</p>
        </div>
    )
}

export default User;