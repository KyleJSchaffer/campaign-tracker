import React from 'react';
import { MapModes } from '../../../constants'
import SessionListContainer from '../SessionList';

class EditPathForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.editSessionList = this.editSessionList.bind(this)
    }

    //Edits the selected path on a change in the input fields
    handleChange(e) {
        const editedPath = { ...this.props.path, [e.target.name]: e.target.value }
        this.props.editPath(this.props.path._id, editedPath);
    }

    //Edits the selected path when the session list is changed
    editSessionList(sessions) {
        const editedPath = { ...this.props.path, sessions: sessions }
        this.props.editPath(this.props.path._id, editedPath);
    }

    //Renders an input field for the path name along with the session list
    //The buttons to insert a location in the middle of the path or cancel changes to the path are also rendered
    render() {
        const path = this.props.path;
        return (
            <div>
                <h3>Edit Path</h3>
                <label>Path Name</label>
                <input className='form-control' name='name' readOnly={this.props.mapMode !== MapModes.EDIT_MODE} value={path.name} onChange={this.handleChange}></input>
                {this.props.mapMode === MapModes.EDIT_MODE &&
                    <div>
                        <button className='btn btn-primary' onClick={() => this.props.insertLocation(path.startLoc, path.endLoc, path._id)}>Insert Location</button>
                        <button className='btn btn-primary' onClick={() => this.props.cancelChanges(path._id)} disabled={path.isNew}>Cancel Changes</button>
                    </div>
                }
                <SessionListContainer selectedSessions={path.sessions} editSessionList={this.editSessionList} id={path._id}/>
            </div>
        )
    }
}

export default EditPathForm;