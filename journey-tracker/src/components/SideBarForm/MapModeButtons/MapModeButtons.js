import React from 'react';
import { MapModes } from '../../../constants';

class MapModeButtons extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            addButtonClass: 'btn btn-primary',
            editButtonClass: 'btn btn-primary'
        }

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.toggleAddMode = this.toggleAddMode.bind(this);
    }

    //Changes mapMode state to edit_mode. If already in edit_mode changes to view_mode
    toggleEditMode() {
        if (this.props.mapMode === MapModes.EDIT_MODE) {
            this.props.setMapMode(MapModes.VIEW_MODE);
        } else {
            this.props.setMapMode(MapModes.EDIT_MODE);
        }
    }

    //Changes mapMode state to add_mode. If already in add_mode changes to view_mode
    toggleAddMode() {
        if (this.props.mapMode === MapModes.ADD_MODE) {
            this.props.setMapMode(MapModes.VIEW_MODE)
        } else {
            this.props.setMapMode(MapModes.ADD_MODE)
        }
    }

    //Renders the Add Location and Enable Editing buttons
    render() {
        let addButtonActive='', editButtonActive='';
        if (this.props.mapMode === MapModes.ADD_MODE){
            addButtonActive='active'
        }
        if(this.props.mapMode ===MapModes.EDIT_MODE){
            editButtonActive='active'
        }
        return (
            <div>
                <button className={'btn btn-primary ' + addButtonActive} onClick={this.toggleAddMode}>Add Location</button>
                <button className={'btn btn-primary '+ editButtonActive} onClick={this.toggleEditMode}>Enable Editing</button>
            </div>
        )
    }
}

export default MapModeButtons;