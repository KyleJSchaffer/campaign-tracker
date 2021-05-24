import React from 'react';
import PropTypes from 'prop-types'

//Renders two inputs to change the provided item's itemName and itemLink
const ItemInput = props =>
    <div className='form-inline'>
        <label >Item Name</label>
        <input className="form-control" value={props.item.itemName}
            onChange={(e) => props.onChange({ ...props.item, itemName: e.target.value })}
        />
        <label>Link (optional)</label>
        <input className="form-control" value={props.item.itemLink}
            onChange={(e) => props.onChange({ ...props.item, itemLink: e.target.value })}
        />
    </div>

ItemInput.propTypes = {
    //Item being edited
    item: PropTypes.exact({
        itemName: PropTypes.string,
        itemLink: PropTypes.string
    }),
    onChange: PropTypes.func.isRequired
}

export default ItemInput;