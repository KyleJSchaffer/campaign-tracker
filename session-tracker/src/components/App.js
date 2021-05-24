import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import GuestAccountMessage from "./GuestAccountMessage";
import RoutingButtons from './RoutingButtons';
import ViewAllSessionsRoute from './ViewAllSessionsRoute';
import AddSessionRoute from './AddSessionRoute';
import EditSessionRoute from './EditSessionRoute';
import ViewSingleSessionRoute from './ViewSingleSessionRoute'

class App extends Component {
    render() {
        return (
            <div>
                <NavBar currentUser={localStorage.getItem('Username')} />
                {!localStorage.getItem('Username') && <GuestAccountMessage />}
                <h1 className="display-3">Session Tracker</h1>
                <Router basename='/sessions'>
                    <div>
                        <RoutingButtons />
                        <br />
                        <Route exact path='/' component={ViewAllSessionsRoute} />
                        <Route path='/add_session' component={AddSessionRoute} />
                        <Route path='/edit_session' component={EditSessionRoute} />
                        <Route path='/view_session/:id' component={ViewSingleSessionRoute} />
                    </div>
                </Router>
                <ToastContainer autoClose={2000} position="bottom-right" />
            </div>
        )
    }
}

export default App;