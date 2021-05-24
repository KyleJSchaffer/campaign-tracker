import React from 'react';
import LoginForm from './LoginForm'
import LoggedInMessage from './LoggedInMessage';
import '../css/formStyle.css';

class LoginDisplay extends React.Component {

    componentDidMount() {
        this.props.clearErrorMessage();
    }

    //If the user is logged in render the logged in message, otherwise render the login form
    render() {
        if (this.props.isLoggedIn) {
            return <LoggedInMessage logout={this.props.logout} />
        } else {
            return <LoginForm requestLogin={this.props.requestLogin} errorMessage={this.props.errorMessage} />
        }
    }
}

export default LoginDisplay;