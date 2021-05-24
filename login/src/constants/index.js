export const APP_ROOT = (process.env.NODE_ENV === 'development' || process.env.REACT_APP_STAGING_ENV) ?
'http://localhost:3000/campaign-tracker' : 'https://dnd.kschaffer.com'

export const API_ROOT = (process.env.NODE_ENV !== 'production' || process.env.REACT_APP_STAGING_ENV) ?
    'http://localhost:3001/api' : 'https://www.kschaffer.com/dnd-tracker/api';