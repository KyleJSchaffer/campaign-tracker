import React from 'react';

class SessionDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displaySessionSelect: false
        }
        this.addSession = this.addSession.bind(this);
        this.removeSession = this.removeSession.bind(this);
    }

    componentDidUpdate(prevProps) {
        //Hide the dropdown list if a different location/path is selected
        if (prevProps.id !== this.props.id) {
            this.setState({
                displaySessionSelect: false
            })
        }

    }

    //Passes the session list with the session added to the callback
    addSession(e) {
        let newSelectedSession = [...this.props.selectedSessions, e.target.id];
        this.props.editSessionList(newSelectedSession)
    }

    //Passes the session list with the session removed to the callback
    removeSession(e) {
        let newSelectedSession = this.props.selectedSessions.filter(sessionID => sessionID !== e.target.id)
        this.props.editSessionList(newSelectedSession)
    }

    //Renders a dropdown list for all sessions. Sessions can be added or removed to provided session list by selecting them in the dropdown
    render() {
        //Sort the sessions in descending order based on session number
        const sessions = Object.values(this.props.sessions);
        sessions.sort((a, b) => (b.number - a.number));

        //Maps each session to a list item
        const sessionList = sessions.map(session => {
            let activeStatus = '';
            let handleClick = this.addSession;
            if (this.props.selectedSessions.includes(session._id)) {
                activeStatus = ' active'
                handleClick = this.removeSession
            }
            return <li className={'list-group-item' + activeStatus} key={session._id} id={session._id} onClick={handleClick} >{session.number + ' ' + session.title}</li>
        })

        //Display a single message in the list if there are no sessions
        if (sessionList.length === 0) {
            sessionList.push(<li key='no_session' className='list-group-item'>No Session Info Found</li>)
        }
        return (
            <div>
                <button
                    onClick={() => this.setState({ displaySessionSelect: !this.state.displaySessionSelect })}
                    className='btn btn-primary dropdown-toggle'>
                    Add Session
                </button>
                {this.state.displaySessionSelect &&
                    <ul className='list-group dropdownContent'>
                        {sessionList}
                    </ul>
                }
            </div>
        )
    }


}

export default SessionDropdown;