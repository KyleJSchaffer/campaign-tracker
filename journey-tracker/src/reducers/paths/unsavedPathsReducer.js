import { EDIT_PATH, ADD_LOCATION, DELETE_LOCATION, INSERT_LOCATION } from '../../actions';

export const unsavedPathsReducer = (state, action) => {

    let newPathState = {};
    switch (action.type) {
        //Replace the targeted path with the path given by the action
        case EDIT_PATH:
            newPathState = { ...state };
            newPathState[action.path._id] = { ...action.path, isEdited: true };
            return newPathState;

        //If atleast one location already exists, create a new path starting at previous last location and ending at the new location
        case ADD_LOCATION:
            if (action.lastLoc) {
                newPathState = {
                    ...state,
                    [action.newPathID]: {
                        _id: action.newPathID,
                        name: 'New Path',
                        sessions: [],
                        startLoc: action.lastLoc,
                        endLoc: action.newLocID,
                        isNew: true
                    }
                }
            }
            return newPathState;

        //Delete the path after the location. If it is the last location, delete the path before it
        case DELETE_LOCATION:
            //If there are no paths, do nothing
            if (Object.values(state).length === 0) {
                return state
            }

            //Find the exiting and entering paths of the deleted location
            let enteringPath, exitingPath;
            newPathState = { ...state };
            for (const pathID in newPathState) {
                const path = newPathState[pathID];
                if (path.endLoc === action.id) {
                    enteringPath = pathID
                } else if (path.startLoc === action.id) {
                    exitingPath = pathID
                }
            }

            //If there is no exiting path, it is the last location and the entering path is deleted. Otherwise delete the exiting path
            if (!exitingPath) {
                delete newPathState[enteringPath];
            }
            else {
                //If an entering path exists, set the endLoc of that path to the endLoc of the path that will be deleted
                if (enteringPath) {
                    newPathState[enteringPath] = { ...newPathState[enteringPath], endLoc: newPathState[exitingPath].endLoc }
                }
                delete newPathState[exitingPath];
            }
            return newPathState

        //Create a new path starting at the new location and ending at the targeted path's endLoc
        case INSERT_LOCATION:
                newPathState = {
                ...state,
                [action.newPathID]: {
                    _id: action.newPathID,
                    name: 'New Path',
                    sessions: [],
                    startLoc: action.newLocID,
                    endLoc: action.endLoc,
                    isNew: true
                },
                //Change the endLoc of the targeted path to the new location
                [action.pathID]: {
                    ...state[action.pathID],
                    endLoc: action.newLocID
                }
            }
            return newPathState

        default:
            return state
    }
}