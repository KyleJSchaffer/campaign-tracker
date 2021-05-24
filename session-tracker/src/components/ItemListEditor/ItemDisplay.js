import React from 'react'
import PropTypes from 'prop-types'

//If a link is provided, create a hyperlink, otherwise render the item name in normal text
const ItemDisplay = props =>
    <div>
        {props.item.itemLink ?
            <a href={props.item.itemLink} target='_blank' rel='noopener noreferrer'>{props.item.itemName}</a>
            : <span>{props.item.itemName}</span>
        }
    </div>

ItemDisplay.propTypes = {
    //Item to display
    item: PropTypes.exact({
        itemName: PropTypes.string,
        itemLink: PropTypes.string
    })
}

export default ItemDisplay;