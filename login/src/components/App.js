import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginDisplayContainer from '../containers/LoginDisplayContainer';
import NavBarContainer from '../containers/NavBarContainer';
import SiteDescription from './SiteDescription';
import RegistrationFormContainer from '../containers/RegistrationFormContainer';

class App extends React.Component {

    render() {
        return (
            <div>
                <NavBarContainer />
                <Router basename='/'>
                    <Route exact path='/' component={SiteDescription} />
                    <div className='formDisplay'>
                        <Route exact path='/login' component={LoginDisplayContainer} />
                        <Route exact path='/register' component={RegistrationFormContainer} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;