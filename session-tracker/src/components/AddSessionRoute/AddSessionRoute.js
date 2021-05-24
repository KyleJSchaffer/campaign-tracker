import React from 'react';
import AddSessionFormContainer from './AddSessionFormContainer';

// the /add_session route displays the form to create a new session
const AddSessionRoute = prop =>
    <div className='col-10'>
        <h1>New Session</h1>
        <AddSessionFormContainer />
    </div>

export default AddSessionRoute