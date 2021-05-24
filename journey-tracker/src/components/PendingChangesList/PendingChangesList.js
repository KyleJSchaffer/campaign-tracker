import React from 'react';
import './PendingChangesList.css'
import './PendingChangesCategory';
import PendingChangesCategory from './PendingChangesCategory';

class PendingEditsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showNewLocations: false,
            showEditedLocations: false,
            showNewPaths: false,
            showEditedPaths: false
        }
    }


    render() {
        let newLocations = [], editedLocations = [], newPaths = [], editedPaths = [];
        //If a location is flagged as isEdited or isNew, create a list item and store it in the correct array
        for (let locID in this.props.locations) {
            let location = this.props.locations[locID];
            if (location.isNew) {
                newLocations.push(<li key={locID} className="list-group-item list-group-item-light" onClick={() => this.props.selectLocation(locID)}>{location.name}</li>)
            } else if (location.isEdited) {
                editedLocations.push(<li key={locID} li className="list-group-item list-group-item-light" onClick={() => this.props.selectLocation(locID)}>{location.name}</li>)
            }
        }

        //If a path is flagged as isEdited or isNew, create a list item and store it in the correct array
        for (let pathID in this.props.paths) {
            let path = this.props.paths[pathID];
            if (path.isNew) {
                newPaths.push(<li key={pathID} className="list-group-item list-group-item-light" onClick={() => this.props.selectPath(pathID)}>{path.name}</li>)
            } else if (path.isEdited) {
                editedPaths.push(<li key={pathID} className="list-group-item list-group-item-light" onClick={() => this.props.selectPath(pathID)}>{path.name}</li>)
            }

        }

        //Passes a list of pending changes to each of the four categories
        return (
            <div>
                <h4>Pending Changes</h4>
                <ul className='list-group'>
                    <PendingChangesCategory name='New Locations' list={newLocations} showList={this.state.showNewLocations}
                        onClick={() => this.setState({ showNewLocations: !this.state.showNewLocations })} />

                    <PendingChangesCategory name='New Paths' list={newPaths} showList={this.state.showNewPaths}
                        onClick={() => this.setState({ showNewPaths: !this.state.showNewPaths })} />

                    <PendingChangesCategory name='Edited Locations' list={editedLocations} showList={this.state.showEditedLocations}
                        onClick={() => this.setState({ showEditedLocations: !this.state.showEditedLocations })} />
                    
                    <PendingChangesCategory name='Edited Paths' list={editedPaths} showList={this.state.showEditedPaths}
                        onClick={() => this.setState({ showEditedPaths: !this.state.showEditedPaths })} />
                </ul>
            </div>
        )
    }
}

export default PendingEditsList;