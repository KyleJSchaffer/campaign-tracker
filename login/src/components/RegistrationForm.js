import React from 'react';
import { Link } from 'react-router-dom';

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);

        this.props.clearServerError();

        this.MIN_USERNAME_LENGTH = 4;
        this.MIN_PW_LENGTH = 4;
        this.MAX = 20;
        this.MAX = 20;

        this.state = {
            username: '',
            password: '',
            confirmedPassword: '',
            clientErrorMessage: '',
        }

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    //Validates the username and password and sets the error message if they are invalid.
    //Sends the username and password to the API server for registration if they are valid
    handleRegisterClick() {
        if (this.state.username.length < this.MIN_USERNAME_LENGTH) {
            this.setState({
                clientErrorMessage: 'Username must be atleast 4 characters.'
            })
        } else if (this.state.username.length > this.MAX_USERNAME_LENGTH) {
            this.setState({
                clientErrorMessage: 'Username cannot be longer than 20 characters.'
            })
        }
        else if (this.state.password !== this.state.confirmedPassword) {
            this.setState({
                clientErrorMessage: 'Passwords do not match.'
            })
        } else if (this.state.password.length < this.MIN_PW_LENGTH) {
            this.setState({
                clientErrorMessage: 'Password must be atleast 4 characters.'
            })
        } else {
            this.setState({
                clientErrorMessage: ''
            })
            this.props.registerUser(this.state.username, this.state.password)
        }
    }

    //Renders the registration form, the registration button, and a link to the login page
    render() {
        return (
            <div>
                <div className='row inputContainer'>
                    <div className='col-6'>
                        <label>New Username</label>
                    </div>
                    <div className='col-6' style={{ padding: '0px' }}>
                        <input onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username}></input>
                    </div>
                </div>
                <div className='row inputContainer'>
                    <div className='col-6' >
                        <label>Password</label>
                    </div>
                    <div className='col-6' style={{ padding: '0px' }}>
                        <input onChange={(e) => this.setState({ password: e.target.value })} type='password' value={this.state.password}></input><br></br>
                    </div>
                </div>
                <div className='row inputContainer'>
                    <div className='col-6' >
                        <label>Confirm Password</label>
                    </div>
                    <div className='col-6' style={{ padding: '0px' }}>
                        <input onChange={(e) => this.setState({ confirmedPassword: e.target.value })} type='password' value={this.state.confirmedPassword}></input><br></br>
                    </div>
                </div>
                <div className='offset-6'>
                    <button onClick={this.handleRegisterClick}>Register</button>
                    <br />
                    <Link className='loginLink' to='/login'>Login to existing account</Link>
                </div>
                <div className='offset-6 '>
                    {
                        this.props.serverResponse.success ?
                            <p className='text-success'>Temporary account created.</p>
                            :<p className='text-danger'>{this.props.serverResponse.errorMessage || this.state.clientErrorMessage}</p>
                    }
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p>Temporary accounts are for demonstration purposes and are deleted at 4AM EST daily.</p>
                </div>
            </div>
        )
    }
}

export default RegistrationForm;