import React from 'react';
import PropTypes from 'prop-types'
import './CurrencyInput.css';

//Displays an input for each type of the currencies
const CurrencyInput = props =>
    <div>
        <label>PP</label>
        <input value={props.currency.platinum} className='currencyInput' type='number'
            onChange={(e) => props.onChange({ ...props.currency, platinum: e.target.value })}
        />
        <label>GP</label>
        <input value={props.currency.gold} className='currencyInput' type='number'
            onChange={(e) => props.onChange({ ...props.currency, gold: e.target.value })}
        />
        <label>EP</label>
        <input value={props.currency.electrum} className='currencyInput' type='number'
            onChange={(e) => props.onChange({ ...props.currency, electrum: e.target.value })}
        />
        <label>SP</label>
        <input value={props.currency.silver} className='currencyInput' type='number'
            onChange={(e) => props.onChange({ ...props.currency, silver: e.target.value })}
        />
        <label>CP</label>
        <input value={props.currency.copper} className='currencyInput' type='number'
            onChange={(e) => props.onChange({ ...props.currency, copper: e.target.value })}
        />
    </div>

CurrencyInput.propTypes = {
    //Currency to display
    currency: PropTypes.object.isRequired,
    //Function to change input
    onChange: PropTypes.func.isRequired
} 
    

export default CurrencyInput