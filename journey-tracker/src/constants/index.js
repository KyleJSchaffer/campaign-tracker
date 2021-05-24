export const CANVAS_WIDTH = 700;
export const CANVAS_HEIGHT = 500;

export const MapModes = {
    VIEW_MODE: 'VIEW_MODE',
    ADD_MODE: 'ADD_MODE',
    EDIT_MODE: 'EDIT_MODE'
}

//Determine the root of the app depending on if the app was built for the dev or production environment
export const APP_ROOT = ((process.env.NODE_ENV !== 'production' || process.env.REACT_APP_DEV_ENV) ?
    'http://localhost:3000/campaign-tracker' : 'https://dnd.kschaffer.com'
)

//Determine the root of the api server depending on if the app was built for the dev or production environment
export const API_ROOT = (process.env.NODE_ENV !== 'production' || process.env.REACT_APP_DEV_ENV) ?
    'http://localhost:3001/api' : 'https://www.kschaffer.com/dnd-tracker/api';