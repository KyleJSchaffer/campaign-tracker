import { connect } from 'react-redux';
import { selectLocation, editLocation } from '../../../actions';
import LocationPoints from './LocationPoints';

const mapStateToProps = state =>({
    locations: state.locations.unsavedLocations,
    mapMode: state.mapMode,
    selectedLocationID: state.selectedLocation
});

const mapDispatchToProps = dispatch =>({
    selectLocation: id=>dispatch(selectLocation(id)),
    editLocation: (id, location)=>dispatch(editLocation(id, location))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationPoints)