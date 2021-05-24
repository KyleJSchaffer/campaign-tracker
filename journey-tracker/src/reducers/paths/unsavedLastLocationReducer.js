import { ADD_LOCATION, DELETE_LOCATION } from '../../actions';

export const unsavedLastLocationReducer = (state, action) => {
    switch (action.type) {

        //Set the state to the new location id
        case ADD_LOCATION:
            return action.newLocID

        //If the last location is deleted, determine the new last location and return it 
        case DELETE_LOCATION:
            //If there are no paths, the location being deleted is the only location and lastLocation is set to null
            if (Object.values(action.paths).length === 0) {
                return null
            }
            //If the locaiton being deleted is the last location, find the new last location
            if(action.id === state){
                let newLastLoc;
                for (const pathID in action.paths) {
                    const path = action.paths[pathID];
                    if (path.endLoc === action.id) {
                        newLastLoc = path.startLoc
                    }
                }
                return newLastLoc
            }
            return state

        default:
            return state
    }
}