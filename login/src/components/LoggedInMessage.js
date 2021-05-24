import React from 'react';

//Renders the logged in user's username and the button to log out
const LoggedInMessage = props =>
    <div className='offset-6'>
        <p>Logged in as {localStorage.getItem('Username')}.</p>
        <button onClick={props.logout}>Logout</button>
    </div>

export default LoggedInMessage;