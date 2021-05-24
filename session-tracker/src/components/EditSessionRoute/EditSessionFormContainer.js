import React from 'react'
import PropTypes from 'prop-types';
import SessionForm from '../SessionForm/SessionForm';
import {editSession, deleteSession} from '../../utils/API'

//Maintains the state for an existing session and provides a buttons to save changes or delete the session
class EditSessionFormContainer extends React.Component {

    constructor(props) {
        super(props);

        //The initial state of the session is provided in the props
        this.state = {
            session: this.props.session
        }

        this.submitEdit = this.submitEdit.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
    }

    //If a different session is selected, set the state to the new session
    componentDidUpdate() {
        if (this.props.session._id !== this.state.session._id) {
            this.setState({ session: this.props.session })
        }
    }

    //Send request to API server to edit the session
    submitEdit() {
        editSession(this.state.session)
    }

    //Send request to API server to delete the session
    deleteSession() {
        deleteSession(this.state.session._id)
    }

    //Renders the session form along with the control buttons
    render() {
        return (
            <div>
                <SessionForm session={this.state.session}
                    onChange={(session) => { this.setState({ session: session }) }} />
                <button type="button" className="btn btn-primary" onClick={this.submitEdit}>Submit</button>
                <button type="button" className="btn btn-primary" onClick={this.deleteSession}>Delete</button>
            </div>
        )
    }
}

EditSessionFormContainer.propTypes = {
    //Session being edited
    session: PropTypes.object.isRequired
}

export default EditSessionFormContainer;