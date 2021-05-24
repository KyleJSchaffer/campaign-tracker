import {
    EDIT_LOCATION,
    ADD_LOCATION,
    DELETE_LOCATION,
    INSERT_LOCATION
} from '../../actions';

export const unsavedLocationsReducer = (state = {}, action) => {
    let newLocationState = {};
    switch (action.type) {

        //Return the list of locations with the the edited location
        case EDIT_LOCATION:
            //Ensure the x and y position are between 0 and 1
            let xPos = action.location.xPos;
            let yPos = action.location.yPos;
            if (xPos > 1) xPos = 1;
            if (xPos < 0) xPos = 0;
            if (yPos > 1) yPos = 1;
            if (yPos < 0) yPos = 0;

            newLocationState = {
                ...state,
                [action.location._id]: {
                    ...action.location,
                    xPos: xPos,
                    yPos: yPos,
                    isEdited: true
                }
            }
            return newLocationState;

        //Adds the new location to the list of locations
        case ADD_LOCATION:
            newLocationState = {
                ...state,
                [action.newLocID]: {
                    _id: action.newLocID,
                    name: 'New Location',
                    xPos: action.xPos,
                    yPos: action.yPos,
                    sessions: [],
                    isNew: true
                }
            }
            return newLocationState;

        //Return the list of locations with the deleted location removed
        case DELETE_LOCATION:
            newLocationState = { ...state };
            delete newLocationState[action.id];
            return newLocationState;

        //Creates a new location at the mid point of the start and end location
        case INSERT_LOCATION:
            const startLoc = state[action.startLoc];
            const endLoc = state[action.endLoc];
            newLocationState = {
                ...state,
                [action.newLocID]: {
                    _id: action.newLocID,
                    name: 'New Location',
                    xPos: (startLoc.xPos + endLoc.xPos) / 2,
                    yPos: (startLoc.yPos + endLoc.yPos) / 2,
                    sessions: [],
                    isNew: true
                }
            }
            return newLocationState;

        default:
            return state;
    }
}