import React from 'react'
import { MapModes } from '../../../constants';
import './SessionList.css';
import SessionListDisplay from './SessionLinks';
import SessionDropdown from './SessionDropdown';

class SessionList extends React.Component {

    //Fetch sessions if they have not already been fetched
    componentDidMount() {
        if (!this.props.sessionsFetched) {
            this.props.requestSessions();
        }
    }

    //Renders the list showing all sessions in the session list. If the mapMode is edit_mode, the session dropdown list is also rendered
    render() {
        if (!this.props.sessionsFetched) {
            return <p>Fetching Sessions</p>
        } else {
            return (
                <div>
                    <div className='row'>
                        <div className='col-8'>
                            <h5>Sessions</h5>
                        </div>
                        <div className='col-4'>
                            {this.props.mapMode === MapModes.EDIT_MODE &&
                            <SessionDropdown
                                sessions={this.props.sessions}
                                selectedSessions={this.props.selectedSessions}
                                editSessionList={this.props.editSessionList}
                                id={this.props.id}
                            />
                            }
                        </div>
                    </div>
                    <SessionListDisplay
                        sessions={this.props.sessions}
                        selectedSessions={this.props.selectedSessions}
                        editSessionList={this.props.editSessionList}
                    />
                </div >
            )
        }

    }
}

export default SessionList;