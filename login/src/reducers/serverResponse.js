import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERROR_MESSAGE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
} from '../actions';

const initialState = {
    success: false,
    errorMessage: ''
}

export const serverResponse = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {
                success: true,
                errorMessage: ''
            };
        case REGISTER_USER_FAIL:
            return {
                success: false,
                errorMessage: action.error
            }
        case LOGIN_SUCCESS:
            return {
                success: true,
                errorMessage: ''
            };
        case LOGIN_FAIL:
            return {
                success: false,
                errorMessage: action.error
            }
        case CLEAR_ERROR_MESSAGE:
            return {
                success: false,
                errorMessage: ''
            }
        default:
            return state
    }
}