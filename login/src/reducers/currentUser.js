import { LOGOUT, LOGIN_SUCCESS } from "../actions";

const initialState = {
    username: localStorage.getItem('Username')
}

export const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return{
                username: action.username
            }
        case LOGOUT:
            return {
                username: null
            }
        default:
            return state;
    }
}