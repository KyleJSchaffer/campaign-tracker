//Determine the root of the app depending on if the app was built for the dev or production
export const APP_ROOT = ((process.env.NODE_ENV !== 'production' || process.env.REACT_APP_DEV_ENV) ?
    'http://localhost:3000/campaign-tracker' : 'https://dnd.kschaffer.com'
)

//Determine the root of the API server depending on if the app was built for the dev or production environment
export const API_ROOT = (process.env.NODE_ENV !== 'production' || process.env.REACT_APP_DEV_ENV) ?
    'http://localhost:3001/api' : 'https://www.kschaffer.com/dnd-tracker/api';