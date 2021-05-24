import React from 'react';
import { MapModes } from '../../constants';
import './SidebarForm.css'
import EditLocationFormContainer from './EditLocationForm';
import EditPathFormContainer from './EditPathForm';
import LocationInfoView from './LocationInfoView'
import PathInfoView from './PathInfoView';
import MapModeButtons from './MapModeButtons';
import SubmissionButtonsContainer from './SubmissionButtons'

class SideBarForm extends React.Component {
    render() {
        const mapMode = this.props.mapMode;
        //Determine which form to display based on what the map mode is and if a path or location is selected
        let formComponent;
        if (mapMode === MapModes.ADD_MODE) {
            formComponent = <p>Click on the map to add a location.</p>
        } else if (mapMode === MapModes.EDIT_MODE && this.props.selectedLocation) {
            formComponent = <EditLocationFormContainer />
        } else if (mapMode === MapModes.VIEW_MODE && this.props.selectedLocation) {
            formComponent = <LocationInfoView location={this.props.selectedLocation} />
        } else if (mapMode === MapModes.VIEW_MODE && this.props.selectedPath) {
            formComponent = <PathInfoView path={this.props.selectedPath} />
        } else if (mapMode === MapModes.EDIT_MODE && this.props.selectedPath) {
            formComponent = <EditPathFormContainer />
        }

        //Renders the mode buttons, the location/path information form, and the submission buttons
        return (
            <div>
                <MapModeButtons />
                {formComponent}
                <div className='submissionButtons'>
                    <SubmissionButtonsContainer />
                </div>
            </div>
        )
    }
}

export default SideBarForm;