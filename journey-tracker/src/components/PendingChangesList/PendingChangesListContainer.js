import { connect } from 'react-redux';
import {selectLocation, selectPath} from '../../actions';
import PendingChangesList from './PendingChangesList';


const mapStateToProps = state => ({
        locations: state.locations.unsavedLocations,
        paths: state.paths.unsavedPaths
})

const mapDispatchToProps = dispatch =>({
    selectLocation: id => dispatch(selectLocation(id)),
    selectPath: id =>dispatch(selectPath(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingChangesList);