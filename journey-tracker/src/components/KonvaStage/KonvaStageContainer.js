import {connect} from 'react-redux';
import {fetchMapData} from '../../actions';
import KonvaStage from './KonvaStage';

const mapStateToProps = state => ({
    mapMode: state.mapMode
});

const mapDispatchToProps = dispatch =>({
    fetchMapData: ()=>dispatch(fetchMapData())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KonvaStage);
