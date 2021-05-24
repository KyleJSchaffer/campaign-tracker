import React from 'react'
import { APP_ROOT } from '../constants'

//Renders a message letting the user know they are not logged
const GuestAccountMessage = props =>
    <p style={{ textAlign: 'center' }}>You are currently viewing the guest account content and will be unable to save any changes.
        <a href={APP_ROOT + '/login'}> Login to an existing account</a> or <a href={APP_ROOT + '/register'}>create a temporary account</a> to save changes to the database.
    </p>

export default GuestAccountMessage;