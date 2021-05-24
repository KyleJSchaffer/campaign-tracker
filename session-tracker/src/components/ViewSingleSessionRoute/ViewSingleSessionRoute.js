import React from 'react';
import { requestSingleSession } from '../../utils/API'
import { Link } from 'react-router-dom'
import SessionDisplay from '../SessionDisplay';

//Contains a single session fetched from the database and passes it to the SessionDisplay component
class ViewSingleSessionRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            session: null
        }
    }

    componentDidMount() {
        //Fetch the session id provided by the URL from the database and sets it to the state if successfull
        requestSingleSession(this.props.match.params.id).then(session => {
            if (session) {
                this.setState({
                    session: session
                })
            }
        })
    }

    //Renders the SessionDisplay if the session was succesfully fetched, otherwise displays an error message
    render() {
        return (
            this.state.session ?
                <div>
                    <SessionDisplay session={this.state.session} />
                    <Link to={'/edit_session/' + this.state.session._id}><button className="btn btn-primary">Edit</button></Link>
                </div>
                :
                <p>{`Could not find session with id: ${this.props.match.params.id}`}</p>
        )

    }
}


export default ViewSingleSessionRoute