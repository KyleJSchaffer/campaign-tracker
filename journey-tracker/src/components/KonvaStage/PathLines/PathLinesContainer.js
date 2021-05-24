import { connect } from 'react-redux';
import { selectPath } from '../../../actions';
import PathLines from './PathLines';

//Adds the positions of the start points and end points to each path
const mapPathsToLocations = (paths, locations) => {
    let mappedPaths = {}
    for (var pathID in paths) {
        let path = paths[pathID];
        mappedPaths[pathID] = {
            ...path,
            startPos: {xPos: locations[path.startLoc].xPos, yPos: locations[path.startLoc].yPos},
            endPos: {xPos: locations[path.endLoc].xPos, yPos: locations[path.endLoc].yPos}
        }
    }
    return mappedPaths;

}

const mapStateToProps = state => {
    const mappedPaths = mapPathsToLocations(state.paths.unsavedPaths, state.locations.unsavedLocations);
    return {
        paths: mappedPaths,
        mapMode: state.mapMode,
        selectedPath: state.selectedPath
    }
}

const mapDispatchToProps = dispatch => ({
    selectPath: id => dispatch(selectPath(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PathLines);