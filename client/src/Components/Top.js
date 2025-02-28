import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import the authentication context

function Top() {
  const { user, signOut } = useAuth(); // Get the user and signOut function from the authentication context

  return (
    <div className='nav-bar-wrapper'>
      <div className='logo'>
        <a href="/">Tripper</a>
      </div>
      <div className='nav-bar-item'>
        <nav id='navbar'>
          <ul>
            <li><a href="/transportation">Transportation</a></li>
            <li><a href="/destination">Destination</a></li>
            <li><a href="/accomadation">Accommodation</a></li>
            <li><a href="/contact">Contact</a></li>
            {user ? ( // If user is authenticated, show Logout button
              <li><button className='login-btn' onClick={signOut}>Logout</button></li>
            ) : ( // Otherwise, show Login button
              <li><a className='login-btn' href="/login">Login</a></li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Top;
