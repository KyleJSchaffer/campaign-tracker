import React from 'react';
import { APP_ROOT } from '../constants';

class NavBar extends React.Component {

    render() {
        return (
            <nav className='navbar navbar-expand-sm bg-primary navbar-dark'>
                <ul className='navbar-nav'>
                    <li className='nav-link'>
                        <a className="nav-link" href={APP_ROOT}>>Home</a>
                    </li>
                    <li className='nav-link'>
                        <a className="nav-link" href={APP_ROOT + '/sessions'}>Sessions</a>
                    </li>
                    <li className='nav-link'>
                        <a className="nav-link" href={APP_ROOT + '/journey'}>Journey</a>
                    </li>
                    <li className='nav-link'>
                        <a className="nav-link" href={APP_ROOT + '/login'}>{this.props.currentUser ? 'Logout' : 'Login'}</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar;