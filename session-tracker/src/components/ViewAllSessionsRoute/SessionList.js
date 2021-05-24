import React from 'react'
import SessionListDetails from './SessionListDetails';

//Lists all the session numbers and titles. If a session is selected, detailed information about it is displayed
const SessionList = props =>
    <div>
        <ul className='list-group'>
            {props.sessions.map(session => (
                <div key={session._id}>
                    <li className='list-group-item' onClick={()=>props.selectSession(session._id)}>
                        <b>Session {session.sessionNumber} {session.sessionTitle}</b>
                        <span style={{ float: 'right' }} className='dropdown-toggle' />
                    </li>
                    {session._id === props.selectedSession &&
                        <SessionListDetails session={session} />
                    }
                </div>
            ))}
        </ul>
    </div>
export default SessionList;