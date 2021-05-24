import React from 'react';
import { Line } from 'react-konva';
import { MapModes } from '../../../constants';

//Draw a single line on the map using information provided by the props
class SinglePathLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mouseOver: false
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.getStrokeColor = this.getStrokeColor.bind(this);
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

    //Returns white if the location is moused over or selected, returns red for new paths, otherwise returns black
    getStrokeColor() {
        if (this.props.mapMode !== MapModes.ADD_MODE && (this.state.mouseOver || this.props.isSelected)) {
            return 'white';
        }
        else if (this.props.isNew) {
            return 'red';
        } else {
            return 'black';
        }
    }

    render() {
        const strokeColor = this.getStrokeColor()

        return (
            <Line
                points={this.props.points}
                stroke={strokeColor}
                strokeWidth={3}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={() => this.props.selectPath(this.props.id)}
            />
        )
    }
}

export default SinglePathLine;