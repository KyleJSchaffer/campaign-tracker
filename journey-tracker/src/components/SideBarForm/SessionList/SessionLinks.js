import React from 'react';
import {APP_ROOT} from '../../../constants';

class SessionLinks extends React.Component {
    
    //Renders a list of all sessions and links to their respective details page
    render() {
        //Sort the sessions in ascending order by session number
        const sessions = this.props.selectedSessions.map(sessionID=>(this.props.sessions[sessionID]));
        sessions.sort((a,b)=>(a.number-b.number))

        //Maps each session to a link to the sessions detailed page
        const sessionListComponents = sessions.map(session => {
            return (
                <li key={session._id}>
                    <a href={APP_ROOT + '/sessions/view_session/' + session._id} rel='noopener noreferrer' target='_blank'>
                        {'Session ' + session.number + ' ' + session.title}
                    </a>
                </li>)
        })
        //Display message if no sessions are in the session list
        if(sessionListComponents.length===0){
            sessionListComponents.push(<p key='NO_SESSIONS'>No sessions selected</p>)
        }

        return (
            <div>
                <ul className='linkList'>
                    {sessionListComponents}
                </ul>
            </div >
        )
    }
}

export default SessionLinks;