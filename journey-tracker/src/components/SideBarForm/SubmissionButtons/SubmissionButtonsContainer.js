import {connect} from 'react-redux';
import SubmissionButtons from './SubmissionButtons';
import {saveJourney, cancelAllChanges} from '../../../actions';

const mapStateToProps = state => ({
    locations: state.locations.unsavedLocations,
    paths: state.paths.unsavedPaths,
    lastLoc: state.paths.unsavedLastLocation
})

const mapDispatchToProps = dispatch=>({
    saveJourney: (locations,paths, lastLoc) => dispatch(saveJourney(locations,paths, lastLoc)),
    cancelAllChanges: ()=>dispatch(cancelAllChanges())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmissionButtons)