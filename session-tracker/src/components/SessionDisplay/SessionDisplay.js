import React from 'react'
import PropTypes from 'prop-types'
import ItemDisplay from '../ItemListEditor/ItemDisplay';

//Renders detailed information about the sessions
const SessionDisplay = props =>
    <div>
        <h1>{'Session ' + props.session.sessionNumber}<i>{' ' + props.session.sessionTitle}</i></h1>
        <h3>Notes:</h3>
        <div style={{ whiteSpace: 'pre-line' }}>{props.session.description}</div>
        <h3>Spoils</h3>
        <div>Currency:</div>
        <div>PP: {props.session.currency.platinum} GP: {props.session.currency.gold} EP: {props.session.currency.electrum} SP: {props.session.currency.silver} CP: {props.session.currency.copper}</div>
        <div>Items:</div>
        <ul>{(props.session.itemList.length > 0) ? props.session.itemList.map((item, index) => (
            <li key={index} style={{ listStyleType: 'none' }}><ItemDisplay item={item} /></li>
        ))
            : 'No item info'}
        </ul>
    </div>

SessionDisplay.propTypes = {
    //Session to display
    session: PropTypes.object
}

export default SessionDisplay