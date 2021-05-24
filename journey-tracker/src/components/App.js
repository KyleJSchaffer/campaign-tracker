import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from './NavBar';
import GuestAccountMessage from './GuestAccountMessage';
import SideBarFormContainer from './SideBarForm';
import KonvaStageContainer from './KonvaStage';
import PendingChangesListContainer from './PendingChangesList';
import {CANVAS_HEIGHT} from '../constants';

class App extends React.Component {

    render() {
        return (
            <div>
                <NavBar currentUser={localStorage.getItem('Username')} />
                {!localStorage.getItem('Username') && <GuestAccountMessage />}
                <div className='row' style={{ marginTop: '15px', marginLeft: '10px' }}>
                    <div className='col-3 col-xl-3 border border-primary' style={{height: CANVAS_HEIGHT}}>
                        <SideBarFormContainer />                  
                    </div>
                    <div className='col-9 col-xl-7'>
                        <KonvaStageContainer />
                    </div>
                    <div className='col-3 col-xl-2'>
                        <PendingChangesListContainer />
                    </div>
                </div>
                <ToastContainer autoClose={2000} position="bottom-right" />
            </div>
        );
    }
}

export default App;