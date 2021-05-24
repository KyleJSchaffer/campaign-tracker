import {connect} from 'react-redux';
import EditPathForm from './EditPathForm';
import {editPath, cancelPathChanges, insertLocation} from '../../../actions';

const mapStateToProps = state =>{
    
    return{
        path: state.paths.unsavedPaths[state.selectedPath],
        mapMode: state.mapMode
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        editPath: (id, path) => dispatch(editPath(id,path)),
        insertLocation:(startLoc, endLoc, pathID) => dispatch(insertLocation(startLoc, endLoc,pathID)),
        cancelChanges: id => dispatch(cancelPathChanges(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPathForm);