import React from 'react';

//Renders the buttons to save the journey data or undo all changes
const SubmissionButtons= props =>
    <div>
        <button className='btn btn-primary' onClick={() => props.saveJourney(props.locations, props.paths, props.lastLoc)}>Save Changes</button>
        <button className='btn btn-primary' onClick={() => props.cancelAllChanges()}>Cancel All Changes</button>
    </div>

export default SubmissionButtons;