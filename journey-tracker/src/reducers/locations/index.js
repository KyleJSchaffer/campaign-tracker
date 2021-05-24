
import { unsavedLocationsReducer } from './unsavedLocationsReducer';
import {
    REQUEST_MAP_DATA_SUCCESS,
    SAVE_JOURNEY_SUCCESS,
    EDIT_LOCATION,
    ADD_LOCATION,
    DELETE_LOCATION,
    INSERT_LOCATION,
    CANCEL_LOCATION_CHANGE,
    CANCEL_ALL_CHANGES
} from '../../actions'

const initialState = {
    unsavedLocations: {},
    savedLocations: {}
}

//Returns a copy of the locations object with all isNew and isEdited properties flagged false
const unflagEdits = (locations) => {
    let newLocationState = { ...locations };
    for (let locationID in newLocationState) {
        newLocationState[locationID].isNew = false;
        newLocationState[locationID].isEdited = false;
    }
    return newLocationState;
}

//Maps the array of fetched locations to an object keyed with the location ids
const mapLocationArrayToObject = (locations) => {
    let newLocationState = {};
    locations.forEach(location => {
        newLocationState[location._id] = {
            _id: location._id,
            name: location.name,
            xPos: location.xPos,
            yPos: location.yPos,
            sessions: location.sessions
        }
    })
    return newLocationState;
}

/*
This reducer handles the savedLocations and unsavedLocations states and any interaction between the two states.
Any action that only affects the unsavedLocation state is passed onto the unsavedLocations reducer
*/
export const locations = (state = initialState, action) => {
    switch (action.type) {

        //Set saved and unsaved location states to the fetched location data
        case REQUEST_MAP_DATA_SUCCESS:
            return {
                unsavedLocations: mapLocationArrayToObject(action.locations),
                savedLocations: mapLocationArrayToObject(action.locations)
            }

        //Unflag all edited and new locations and copy the unsavedLocations to the savedLocations
        case SAVE_JOURNEY_SUCCESS:
            return {
                unsavedLocations: unflagEdits(state.unsavedLocations),
                savedLocations: unflagEdits(state.unsavedLocations)
            }

        //Copy the value of the target location from the savedLocations to the unsavedLocation
        case CANCEL_LOCATION_CHANGE:
            let newLocationState = { ...state.unsavedLocations };
            newLocationState[action.id] = state.savedLocations[action.id];
            return {
                unsavedLocations: newLocationState,
                savedLocations: state.savedLocations
            }

        //Set the unsavedLocations state to the savedLocations state
        case CANCEL_ALL_CHANGES:
            return {
                unsavedLocations: state.savedLocations,
                savedLocations: state.savedLocations
            }

        //The below actions only affect the unsavedLocations state and are passed onto the unsavedLocations reducer

        case EDIT_LOCATION:
            return {
                unsavedLocations: unsavedLocationsReducer(state.unsavedLocations, action),
                savedLocations: state.savedLocations
            }

        case ADD_LOCATION:
            return {
                unsavedLocations: unsavedLocationsReducer(state.unsavedLocations, action),
                savedLocations: state.savedLocations
            }

        case DELETE_LOCATION:
            return {
                unsavedLocations: unsavedLocationsReducer(state.unsavedLocations, action),
                savedLocations: state.savedLocations
            }

        case INSERT_LOCATION:
            return {
                unsavedLocations: unsavedLocationsReducer(state.unsavedLocations, action),
                savedLocations: state.savedLocations
            }

        default:
            return state
    }
}