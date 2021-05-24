import React from 'react';
import { Link } from 'react-router-dom';
import SessionDisplay from '../SessionDisplay';

//Renders the Session display and buttons linking to the full page and edit views
const SessionListDetails = props =>
    <div>
        <span style={{ float: 'right', marginTop: '10px' }}>
            <Link to={'/edit_session/' + props.session._id}><button className="btn btn-primary">Edit</button></Link>
            <Link to={'/view_session/' + props.session._id}><button className="btn btn-primary">Full Page</button></Link>
        </span>
        <SessionDisplay session={props.session} />
    </div>

export default SessionListDetails;


