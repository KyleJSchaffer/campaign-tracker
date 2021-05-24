import React, { Component } from "react";
import { Route } from "react-router-dom";
import SessionDropdownList from './SessionDropdownList';
import EditSelectedSessionRoute from "./EditSelectedSessionRoute";
import { requestSessions } from '../../utils/API';

//This component is responsible for fetching the sessions from the database and passing them to the dropdown selection list and edit session form
class EditSessionRoute extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
            sessionsFetched: false
        }
    }

    changeSession = (sessionID) => {
        this.props.history.push('/edit_session/' + sessionID);
    }

    componentDidMount() {
        //Request sessions from the API server and set the state if the request is succesful 
        requestSessions().then(sessions => {
            if (sessions) {
                this.setState({
                    sessions: sessions,
                    sessionsFetched: true
                })
            }
        })
    };

    //Renders a dropdown list. If a session id is provided in the url, the EditSelectedSession route is rendered below the dropdown list
    render() {
        return (
            <div>
                <h1>Edit Session</h1>
                <div className='row'>
                    <div className='col-4'>
                        <SessionDropdownList onChange={this.changeSession} sessions={this.state.sessions} />
                    </div>
                </div>
                <Route exact path='/edit_session' render={() => <h1>Select a session to edit.</h1>} />
                {this.state.sessionsFetched ?
                    <Route path='/edit_session/:id' render={(props) => <EditSelectedSessionRoute {...props} sessions={this.state.sessions} />} />
                    : <p>Fetching Sessions</p>
                }
            </div>
        )
    }
}

export default EditSessionRoute;