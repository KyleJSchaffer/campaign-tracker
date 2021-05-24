import React from 'react';
import './EditLocationForm.css'
import SessionListContainer from '../SessionList';

class EditLocationForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.editSessionList = this.editSessionList.bind(this);
    }

    //Edits the selected location on a change in the input fields
    handleChange(e) {
        const editedLocation = { ...this.props.location, [e.target.name]: e.target.value };
        this.props.editLocation(this.props.location._id, editedLocation);
    }

    //Edits the selected location when the session list changes
    editSessionList(sessions) {
        const editedLocation = { ...this.props.location, sessions: sessions }
        this.props.editLocation(this.props.location._id, editedLocation);
    }

    //Renders input fields for the location name and position along with the session list.
    //The buttons to delete the location or cancel changes are also rendered
    render() {
        const location = this.props.location;
        return (
            <div>
                <h3>Edit Location</h3>
                <label>Location Name</label>
                <input className='form-control' name='name' value={location.name} onChange={this.handleChange}></input>
                <div className='form-inline'>
                    <label>xPos</label>
                    <input className='form-control positionInput' name='xPos' value={location.xPos} onChange={this.handleChange}  type='number' step='.01'></input>
                    <label>yPos</label>
                    <input className='form-control positionInput' name='yPos' value={location.yPos} onChange={this.handleChange} type='number' step='.01'></input>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={() => this.props.deleteLocation(location._id)}>Delete Location</button>
                    <button className='btn btn-primary' onClick={() => this.props.cancelChanges(location._id)} disabled={location.isNew}>Cancel Changes</button>
                </div>
                <SessionListContainer selectedSessions={location.sessions} editSessionList={this.editSessionList} id={location._id} />
            </div>
        )
    }
}

export default EditLocationForm;