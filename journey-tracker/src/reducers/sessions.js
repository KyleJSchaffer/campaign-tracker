import {
    REQUEST_SESSIONS_SUCCESS
} from '../actions'

const initialState = {
    sessionList: {},
    sessionsFetched: false
}

//Sessions are fetched once and only the _id, title, and number are stored for use in the app
export const sessions = (state = initialState, action) => {
    let newSessionList = {};
    switch (action.type) {
        case REQUEST_SESSIONS_SUCCESS:
            action.sessions.forEach(session => {
                newSessionList[session._id] = {
                    _id: session._id,
                    title: session.sessionTitle,
                    number: session.sessionNumber
                }
            });
            return {
                sessionList: newSessionList,
                sessionsFetched: true
            }
        default:
            return state;
    }
}