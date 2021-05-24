import React from 'react';
import ItemInput from './ItemInput';
import ItemListEntry from './ItemListEntry'
import PropTypes from 'prop-types';

//Contains the components for displaying the itemlist provided in the props along with the functions for making changes to the itemlist
class ItemListEditorContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //Item that has not yet been added to the item list
            newItem: {
                itemName: '',
                itemLink: ''
            }
        }

        this.addNewItem = this.addNewItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    //Add item to the end of the item list array
    addNewItem() {
        if (this.state.newItem.itemName.length > 0) {
            this.props.editItemList([...this.props.items, this.state.newItem])
            this.setState({
                newItem: {
                    itemName: '',
                    itemLink: ''
                }
            })
        }
    }

    //Remove the item at the given index from the item list array
    deleteItem(index) {
        let newItemList = [...this.props.items]
        newItemList.splice(index, 1)
        this.props.editItemList(newItemList)
    }

    //Replace the item at the given index with the given item
    editItem(item, index) {
        let newItemList = [...this.props.items];
        newItemList.splice(index, 1, item);
        this.props.editItemList(newItemList)
    }

    //Generates a unique ID for an entry in the itemlist. Currently Items are stored in the database without an id.
    //If this changes, use the id generated from the database instead and remove this function
    createUniqueID() {
        //Generates an id from two random chars and the time in milliseconds. There is an extremely small chance the result won't be unique
        const randCharOne = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const randCharTwo = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const uniqueID = randCharOne + randCharTwo + new Date().getTime()
        return uniqueID;
    }

    //Renders the input for the new item along with a list showing the array of items provided in the props
    render() {
        return (
            <div>
                <ItemInput item={this.state.newItem}
                    onChange={(newItem) => this.setState({ newItem: newItem })} />
                <button className='btn btn-primary' onClick={() => this.addNewItem()}>Add Item</button>
                {this.props.items.map((item, index) => (
                    <ItemListEntry key={this.createUniqueID()} index={index} item={item}
                        editItem={this.editItem} deleteItem={this.deleteItem}
                    />
                ))}
            </div>
        )
    }
}

ItemListEditorContainer.propTypes ={
    //The list of items that will be displayed
    items: PropTypes.arrayOf(PropTypes.exact({
        itemName: PropTypes.string,
        itemLink: PropTypes.string
    })),
    //Function to edit the item list provided
    editItemList: PropTypes.func.isRequired
}

export default ItemListEditorContainer;
