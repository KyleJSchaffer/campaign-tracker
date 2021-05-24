import React from 'react';
import PropTypes from 'prop-types';
import ItemDisplay from './ItemDisplay';
import ItemInput from './ItemInput';

//This component determines whether ItemInput or ItemDisplay should be rendered depending on if the item is being edited
//It also maintains the state of any potential edits before they are confirmed, along with buttons to control the item edits
class ItemListEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
            editMode: false,
            editedItem: props.item
        }

        this.confirmEdit = this.confirmEdit.bind(this);
    }

    //Pass the edited item to the call back function and set the state to show the ItemDisplay
    confirmEdit() {
        if (this.state.editedItem.itemName.length > 0) {
            this.props.editItem(this.state.editedItem, this.props.index)
            this.setState({
                editMode: false,
                item: this.state.editedItem
            })
        }
    }


    //If editMode is false, render the ItemDisplay along with buttons to enter editMode or delete the item.
    //If editMode is true, render the ItemInput along with buttons to confirm or cancel the edit
    render() {
        return (
            !this.state.editMode ?
                <div>
                    <ItemDisplay item={this.state.item} />
                    <button className='btn btn-primary' onClick={() => this.setState({ editMode: true })}>Edit</button>
                    <button className='btn btn-primary' onClick={() => this.props.deleteItem(this.props.index)}>Delete</button>
                </div>
                :
                <div>
                    <ItemInput item={this.state.editedItem}
                        onChange={(newItem) => this.setState({ editedItem: newItem })}
                    />
                    <button className='btn btn-primary' onClick={this.confirmEdit}>Confirm</button>
                    <button className='btn btn-primary' onClick={() => this.setState({ editedItem: this.state.item, editMode: false })}>Cancel</button>
                </div>
        )
    }
}

ItemListEntry.propTypes = {
    //Item to display
    item: PropTypes.exact({
        itemName: PropTypes.string,
        itemLink: PropTypes.string
    }).isRequired,
    //Function to delete the item
    deleteItem: PropTypes.func.isRequired,
    //Function to confirm the edits
    editItem: PropTypes.func.isRequired
}

export default ItemListEntry