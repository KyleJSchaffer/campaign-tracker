import {
    REQUEST_MAP_DATA_SUCCESS,
    SAVE_JOURNEY_SUCCESS,
    CANCEL_PATH_CHANGE,
    CANCEL_ALL_CHANGES,
    EDIT_PATH,
    ADD_LOCATION,
    DELETE_LOCATION,
    INSERT_LOCATION
} from '../../actions';
import { unsavedPathsReducer } from './unsavedPathsReducer';
import { unsavedLastLocationReducer } from './unsavedLastLocationReducer';

const initialState = {
    unsavedPaths: {},
    unsavedLastLocation: null,
    savedPaths: {},
    savedLastLocation: null
}

//Maps an array of path objects to a new object keyed with path ids
const mapPathArrayToObject = paths => {
    let newPathState = {};
    paths.forEach(path => {
        newPathState[path._id] = {
            _id: path._id,
            name: path.name,
            startLoc: path.startLoc,
            endLoc: path.endLoc,
            sessions: path.sessions
        }
    })
    return newPathState
}

//Returns a copy of the path object with all isNew and isEdited properties unflagged
const unflagEdits = (paths) => {
    let newPathState = { ...paths };
    for (let locationID in newPathState) {
        newPathState[locationID].isNew = false;
        newPathState[locationID].isEdited = false;
    }
    return newPathState;
}
/*
This reducer handles the saved and unsaved path states and any interaction between those states.
The lastLocation state is also handled by this reducer because the path state relies on it when creating new paths.
Any actions that do not alter or are not dependant on the saved states are passed on to the unsavedPaths and unsavedLastLocation reducers
*/

export const paths = (state = initialState, action) => {

    switch (action.type) {

        //Set saved and unsaved states to the fetched path data
        case REQUEST_MAP_DATA_SUCCESS:
            return {
                unsavedPaths: mapPathArrayToObject(action.paths),
                unsavedLastLocation: action.lastLoc,
                savedPaths: mapPathArrayToObject(action.paths),
                savedLastLocation: action.lastLoc
            }

        //Unflag all isNew and isEdited properties and copy the unsaved states to the saved states
        case SAVE_JOURNEY_SUCCESS:
            return {
                unsavedPaths: unflagEdits(state.unsavedPaths),
                unsavedLastLocation: state.unsavedLastLocation,
                savedPaths: unflagEdits(state.unsavedPaths),
                savedLastLocation: state.unsavedLastLocation
            }

        //Copy the targeted path object from the savedPaths to unsavedPaths state
        case CANCEL_PATH_CHANGE:
            return {
                unsavedPaths: { ...state.unsavedPaths, [action.id]: state.savedPaths[action.id] },
                unsavedLastLocation: state.unsavedLastLocation,
                savedPaths: state.savedPaths,
                savedLastLocation: state.savedLastLocation
            }

        //Copy the saved state data to the unsaved states
        case CANCEL_ALL_CHANGES:
            return {
                unsavedPaths: state.savedPaths,
                unsavedLastLocation: state.savedLastLocation,
                savedPaths: state.savedPaths,
                savedLastLocation: state.savedLastLocation
            }

        //The action is passed onto the unsavedPaths reducer, the rest of the state is unchanged
        case EDIT_PATH:
            return {
                ...state,
                unsavedPaths: unsavedPathsReducer(state.unsavedPaths, action)
            }

        //The action is passed onto the unsavedPaths and unsavedLastLocation reducer, the rest of the state is unchanged
        case ADD_LOCATION:

            return {
                ...state,
                //The lastLocation state is added to the action for the unsavedPaths reducer to be used as the startLoc of the new path
                unsavedPaths: unsavedPathsReducer(state.unsavedPaths, { ...action, lastLoc: state.unsavedLastLocation }),
                unsavedLastLocation: unsavedLastLocationReducer(state.unsavedLastLocation, action)
            }

        //The action is passed onto the unsavedPaths and unsavedLastLocation reducer, the rest of the state is unchanged
        case DELETE_LOCATION:
            return {
                ...state,
                unsavedPaths: unsavedPathsReducer(state.unsavedPaths, action),
                //The path state is added to the action for the unsavedLastLocation reducer to determine the new last location
                unsavedLastLocation: unsavedLastLocationReducer(state.unsavedLastLocation, { ...action, paths: state.unsavedPaths })
            }


        //The action is passed onto the unsavedPaths reducer, the rest of the state is unchanged
        case INSERT_LOCATION:
            return {
                ...state,
                unsavedPaths: unsavedPathsReducer(state.unsavedPaths, action)
            }

        default:
            return state
    }
}