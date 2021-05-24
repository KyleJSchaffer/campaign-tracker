import { connect } from 'react-redux';
import SideBarForm from './SidebarForm';

const mapStateToProps = state => {
    return ({
        mapMode: state.mapMode,
        selectedLocation: state.locations.unsavedLocations[state.selectedLocation],
        selectedPath: state.paths.unsavedPaths[state.selectedPath]
    })
};

export default connect(
    mapStateToProps
)(SideBarForm);
