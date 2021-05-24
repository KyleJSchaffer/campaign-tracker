import React from 'react';
import { APP_ROOT } from '../constants'

const NavBar = props =>
    <nav className='navbar navbar-expand-sm bg-primary navbar-dark'>
        <ul className='navbar-nav'>
            <li className='nav-link'>
                <a className="nav-link" href={APP_ROOT}>Home</a>
            </li>
            <li className='nav-link'>
                <a className="nav-link" href={APP_ROOT + '/sessions'}>Sessions</a>
            </li>
            <li className='nav-link'>
                <a className="nav-link" href={APP_ROOT + '/journey'}>Journey</a>
            </li>
            <li className='nav-link'>
                <a className="nav-link" href={APP_ROOT + '/login'}>{props.currentUser ? 'Logout' : 'Login'}</a>
            </li>
        </ul>
    </nav>

export default NavBar;