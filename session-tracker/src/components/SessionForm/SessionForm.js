import React from 'react';
import PropTypes from 'prop-types'
import CurrencyInput from './CurrencyInput';
import ItemListEditorContainer from '../ItemListEditor';

//Renders a form with the information from the session provided in the props
const SessionForm = props =>
    <div className='row'>
        <div className='col-6'>
            <h1>Session Info</h1>
            <label>Session Number</label>
            <input className="form-control" value={props.session.sessionNumber}
                onChange={(e) => props.onChange({ ...props.session, sessionNumber: e.target.value })}
            />
            <label>Session Title</label>
            <input className="form-control" value={props.session.sessionTitle}
                onChange={(e) => props.onChange({ ...props.session, sessionTitle: e.target.value })}
            />
            <label>Notes</label>
            <textarea className="form-control" value={props.session.description} rows={5}
                onChange={(e) => props.onChange({ ...props.session, description: e.target.value })}
            />
        </div>
        <div className='col-6'>
            <h1>Spoils</h1>
            <h4>Currency</h4>
            <CurrencyInput currency={props.session.currency}
                onChange={(currency) => props.onChange({ ...props.session, currency: currency })}
            />
            <h4>Items</h4>
            <ItemListEditorContainer items={props.session.itemList}
                editItemList={(itemList) => props.onChange({ ...props.session, itemList: itemList })} />
        </div>
    </div >

SessionForm.propTypes = {
    //Session to display
    session: PropTypes.object.isRequired,
    //Function to make changes to the session
    onChange: PropTypes.func.isRequired
}

export default SessionForm