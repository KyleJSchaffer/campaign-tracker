import { connect } from 'react-redux';
import { editLocation, deleteLocation, cancelLocationChange} from '../../../actions';
import EditLocationForm from './EditLocationForm'

const mapStateToProps = state => ({
    location: state.locations.unsavedLocations[state.selectedLocation],
    mapMode: state.mapMode
});

const mapDispatchToProps = dispatch => ({
    editLocation: (id,location) => dispatch(editLocation(id,location)),
    deleteLocation: id => dispatch(deleteLocation(id)),
    cancelChanges: id => dispatch(cancelLocationChange(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditLocationForm);