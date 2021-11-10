// Import dependencies
import React from 'react';

// Import CSS
import './styles.css';

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
            <p><span className='bold'>Username:</span> {details.username}</p>
            <p><span className='bold'>Email:</span> {details.email}</p>
            <p><span className='bold'>Password:</span> {details.password}</p>
            <p><span className='bold'>Agreed to Terms:</span> Yes</p>
        </div>
    )
}

export default User;