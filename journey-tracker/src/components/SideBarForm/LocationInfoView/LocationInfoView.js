import React from 'react';
import SessionListContainer from '../SessionList';

//Renders the location name and its session list
const LocationInfoView = props =>
    <div>
        <h3>{props.location.name}</h3>
        <SessionListContainer selectedSessions={props.location.sessions} />
    </div>

export default LocationInfoView