import { connect } from 'react-redux';
import LoginDisplay from '../components/LoginDisplay';
import {requestLogin, logout, clearErrorMessage} from '../actions';

export const mapStateToProps = state =>({
    isLoggedIn: state.currentUser.username,
    errorMessage: state.serverResponse.errorMessage
})

export const mapDispatchToProps = dispatch=>({
    requestLogin: (username, password)=>dispatch(requestLogin(username,password)),
    logout: ()=> dispatch(logout()),
    clearErrorMessage: ()=>dispatch(clearErrorMessage())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginDisplay)