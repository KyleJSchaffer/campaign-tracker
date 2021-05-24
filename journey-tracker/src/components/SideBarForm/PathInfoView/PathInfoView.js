import React from 'react';
import SessionListContainer from '../SessionList';

//Renders the path name and its session list
const PathInfoView = props =>
    <div>
        <h3>{props.path.name}</h3>
        <SessionListContainer selectedSessions={props.path.sessions} />
    </div>

export default PathInfoView