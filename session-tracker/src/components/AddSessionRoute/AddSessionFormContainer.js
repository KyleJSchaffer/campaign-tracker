import React from 'react';
import { addSession } from '../../utils/API';
import SessionForm from '../SessionForm/SessionForm';

//Maintains the state for a new session and provides a button to save the new session to the API server
class AddSessionFormContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            session: {
                sessionNumber: 0,
                sessionTitle: '',
                description: '',
                currency: { platinum: 0, gold: 0, electrum: 0, silver: 0, copper: 0 },
                itemList: []
            }
        }

        this.saveSession = this.saveSession.bind(this);
    }

    //Send a request to the API server to save the new session. Clear the form if the request is a success
    saveSession() {
        addSession(this.state.session).then(success => {
            if (success) {
                this.clearData();
            }
        })
    }

    clearData() {
        this.setState(
            {
                session: {
                    sessionNumber: 0,
                    sessionTitle: '',
                    description: '',
                    currency: { platinum: 0, gold: 0, electrum: 0, silver: 0, copper: 0 },
                    itemList: []
                }
            }
        )
    }

    //Renders the SessionForm along with the control buttons
    render() {
        return (
            <div>
                <SessionForm session={this.state.session}
                    onChange={(session) => { this.setState({ session: session }) }}
                />
                <button type="button" className="btn btn-primary" onClick={this.saveSession}>Add Session</button>
                <button type="button" className="btn btn-primary" onClick={this.clearData}>Clear</button>
            </div>
        )
    }
}

export default AddSessionFormContainer;