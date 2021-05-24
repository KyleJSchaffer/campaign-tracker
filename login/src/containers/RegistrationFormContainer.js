import { connect } from 'react-redux';
import RegistrationForm from '../components/RegistrationForm';
import {registerUser, clearErrorMessage} from '../actions';

const mapStateToProps = state=>({

    serverResponse: state.serverResponse
})

const mapDispatchToProps = dispatch =>({
    registerUser: (username, password)=>dispatch(registerUser(username,password)),
    clearServerError: ()=>dispatch(clearErrorMessage())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationForm);