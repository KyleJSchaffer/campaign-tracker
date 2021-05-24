import React from 'react'
import { Group } from 'react-konva';
import SingleLocationPoint from './SingleLocationPoint';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../../constants'

//Passes the information from each location in the store to be rendered as points on the map
class LocationPoints extends React.Component {

    constructor(props) {
        super(props);

        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    //Edit the location with the new position
    handleDragEnd(xPos, yPos, locationID) {
        let editedLocation = this.props.locations[locationID];
        editedLocation = { ...editedLocation, xPos: xPos / CANVAS_WIDTH, yPos: yPos / CANVAS_HEIGHT };
        this.props.editLocation(locationID,editedLocation);
    }

    render() {
        let locationPoints = [];
        for (var locationID in this.props.locations) {
            let location = this.props.locations[locationID];
            locationPoints.push(
                <SingleLocationPoint
                    key={locationID}
                    id={locationID}
                    xPos={location.xPos * CANVAS_WIDTH}
                    yPos={location.yPos * CANVAS_HEIGHT}
                    mapMode={this.props.mapMode}
                    onMouseClick={this.props.selectLocation}
                    onDragEnd={this.handleDragEnd}
                    isSelected={locationID === this.props.selectedLocationID}
                    isNew={location.isNew}
                    
                />
            )

        }
        return (
            <Group>
                {locationPoints}
            </Group>
        )
    }
}

export default LocationPoints;