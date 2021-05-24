import React from "react";
import PropTypes from 'prop-types'

//Renders a drop down list of all the session
const SessionDropdownList = props =>
    <div>
        <select onChange={(e) => props.onChange(e.target.value)} defaultValue='default' className='custom-select'>
            <option disabled value='default'>Select a session to edit</option>
            {props.sessions.map(session => (
                <option key={session._id} value={session._id}>{session.sessionNumber + ' ' + session.sessionTitle} </option>
            ))}
        </select>
    </div>

SessionDropdownList.propTypes = {
    //Sessions fetched from the database
    sessions: PropTypes.arrayOf(PropTypes.object)
}

export default SessionDropdownList;