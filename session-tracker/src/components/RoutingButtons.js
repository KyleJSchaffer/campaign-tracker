import React from 'react';
import {Link} from 'react-router-dom';

const RoutingButtons = props =>
    <div className="btn-group">
        <Link to='/'>
            <button type="button" className="btn btn-primary">View Sessions</button>
        </Link>
        <Link to='/add_session' >
            <button type="button" className="btn btn-primary">Add Session</button>
        </Link>
        <Link to='/edit_session'>
            <button type="button" className="btn btn-primary">Edit Sessions</button>
        </Link>
    </div>

export default RoutingButtons