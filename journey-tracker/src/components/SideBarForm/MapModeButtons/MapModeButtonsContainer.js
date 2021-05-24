import { connect } from 'react-redux';
import {setMapMode} from '../../../actions';
import MapModeButtons from './MapModeButtons';

const mapStateToProps = state => ({
    mapMode: state.mapMode
});

const mapDispatchToProps = dispatch => ({
    setMapMode: mapMode => dispatch(setMapMode(mapMode))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapModeButtons);