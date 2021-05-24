import React from 'react';
import { Circle } from 'react-konva';
import { MapModes } from '../../../constants';

//Renders a single circle on the map based on location information received from props
class SingleLocationPoint extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mouseOver: false,
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.getFillColor = this.getFillColor.bind(this);
    }

    handleMouseEnter() {
            this.setState({
                mouseOver: true,
            });
    }

    handleMouseLeave() {
        this.setState({
            mouseOver: false,
        });
    }

    handleDragEnd(e){
        this.props.onDragEnd(e.target.attrs.x, e.target.attrs.y, this.props.id)
    }

    //Returns white if the location is moused over or selected, returns red for new locations, otherwise returns black
    getFillColor() {
        if (this.props.mapMode !== MapModes.ADD_MODE && (this.state.mouseOver || this.props.isSelected)) {
            return 'white';
        } else if (this.props.isNew) {
            return 'red';
        }
        else {
            return 'black';
        }
    }

    render() {
        const fillColor = this.getFillColor()

        return (
            <Circle
                radius={5}
                x={this.props.xPos}
                y={this.props.yPos}
                fill={fillColor}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={() => this.props.onMouseClick(this.props.id)}
                draggable = {this.props.mapMode === MapModes.EDIT_MODE}
                onDragEnd = {this.handleDragEnd}
            />
        )
    }
}

export default SingleLocationPoint;