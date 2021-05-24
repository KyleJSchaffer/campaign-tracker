import React from 'react'
import PropTypes from 'prop-types'
import EditSessionFormContainer from './EditSessionFormContainer';

//Finds the session matching the id provided in the URL and passes it to the form for editing sessions
class EditSelectedSessionRoute extends React.Component {

    render() {
        const session = this.props.sessions.find(session => (
            session._id === this.props.match.params.id
        ))

        //Renders the EditSessionForm if the session was found, otherwise displays an error message
        return (
            <div>
                {session ?
                    <EditSessionFormContainer session={session} />
                    : <p>{`Could not find session with id: ${this.props.match.params.id}`}</p>
                }
            </div>
        )
    }
}

EditSelectedSessionRoute.propTypes = {
    //Sessions from the database
    sessions:PropTypes.arrayOf(PropTypes.object)
}

export default EditSelectedSessionRoute;