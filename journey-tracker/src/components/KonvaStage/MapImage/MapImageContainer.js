import { connect } from 'react-redux';
import { addLocation } from '../../../actions';
import MapImage from './MapImage';

const mapStateToProps = state =>({
    mapMode: state.mapMode
});

const mapDispatchToProps = dispatch =>({    
    addLocation: (xPos,yPos) => dispatch(addLocation(xPos,yPos))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapImage)