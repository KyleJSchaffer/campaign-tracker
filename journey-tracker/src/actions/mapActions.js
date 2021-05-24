import ObjectID from 'bson-objectid'
export const SET_MAP_MODE = 'SET_MAP_MODE';
export const EDIT_LOCATION = 'EDIT_LOCATION';
export const INSERT_LOCATION = 'INSERT_LOCATION';
export const ADD_LOCATION = 'ADD_LOCATION';
export const CANCEL_LOCATION_CHANGE = 'CANCEL_LOCATION_CHANGES';
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const SELECT_PATH = 'SELECT_PATH';
export const EDIT_PATH = 'EDIT_PATH';
export const CANCEL_PATH_CHANGE = 'CANCEL_PATH_CHANGE';
export const CANCEL_ALL_CHANGES = 'CANCEL_ALL_CHANGES';

//Set the mapMode to add_mode, view_mode, or edit_mode
export const setMapMode = mapMode => {
    return({
        type: SET_MAP_MODE,
        mapMode
    });
}

//Make changes to a location
export const editLocation = (id, location) => ({
    type: EDIT_LOCATION,
    id,
    location
});

//Undo all changes to a location
export const cancelLocationChange = id => ({
    type: CANCEL_LOCATION_CHANGE,
    id
})

//Create a new location and path with a unique id
export const addLocation = (xPos, yPos) => ({
    type: ADD_LOCATION,
    xPos,
    yPos,
    newLocID: ObjectID(),
    newPathID: ObjectID()
})

//Inserts a new location at the midpoint of a path and creates a new path
export const insertLocation = (startLoc,endLoc, pathID) => ({
    type: INSERT_LOCATION,
    startLoc,
    endLoc,
    pathID,
    newLocID: ObjectID(),
    newPathID: ObjectID()
});

//Deletes a location and a path
export const deleteLocation = id => ({
    type: DELETE_LOCATION,
    id
})

//Selects a locations to view or edit
export const selectLocation = id => ({
    type: SELECT_LOCATION,
    id
})

//Selects a path to view or edit
export const selectPath = id => ({
    type: SELECT_PATH,
    id
})

//Make changes to a path
export const editPath = (id, path)=>({
    type: EDIT_PATH,
    id,
    path
})

//Undos all changes for a path
export const cancelPathChanges = (id)=>({
    type: CANCEL_PATH_CHANGE,
    id
})

//Undos all changes for every location and path
export const cancelAllChanges = ()=>({
    type: CANCEL_ALL_CHANGES
})