import React from 'react'
import {requestSessions} from '../../utils/API'
import SessionList from './SessionList';

//Contains all of the sessions fetched from the database and passes them to the session list
class SessionListContainer extends React.Component {

    constructor(props) {
        super(props);

        //The selected session determines which session has its details displayed
        this.state = {
            sessions: [],
            selectedSession: null
        }

        this.onSessionClick = this.onSessionClick.bind(this);
    }

    componentDidMount() {
        //Request sessions from the API server and set the state if the request is successful 
        requestSessions().then(sessions => {
            if (sessions) {
                this.setState({
                    sessions: sessions,
                    sessionsFetched: true
                })
            }
        })
    }

    //Set a session to selected if it is clicked. If it is already selected, deselect it
    onSessionClick(sessionID) {
        if (this.state.selectedSession !== sessionID) {
            this.setState({
                selectedSession: sessionID
            })
        } else {
            this.setState({
                selectedSession: null
            })
        }
    }

    //Renders the session list
    render() {
        return (
            <div>
                <SessionList sessions={this.state.sessions} selectedSession={this.state.selectedSession}
                    selectSession={this.onSessionClick} />
            </div>
        )
    }
}

export default SessionListContainer