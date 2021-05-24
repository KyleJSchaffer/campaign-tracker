import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    //Send username and password in a log in request to the server
    handleLoginClick(e) {
        this.props.requestLogin(this.state.username, this.state.password)
        e.preventDefault();
    }

    //Renders the login form, the login button, and a link to the registration page
    render() {
        return (
            <div>
                <div className='row inputContainer'>
                    <div className='col-6'>
                        <label>Username</label>
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
                <div className='offset-6'>
                    <button onClick={this.handleLoginClick}>Login</button>
                    <br />
                    <Link className='registerLink' to='/register'>Create temporary account</Link>
                </div>
                <div className='offset-6 '>
                    <br />
                    <p className='text-danger'>{this.props.errorMessage}</p>
                </div>
            </div >
        )
    }
}

export default LoginForm;