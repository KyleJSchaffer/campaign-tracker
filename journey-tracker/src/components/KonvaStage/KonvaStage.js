import React from 'react';
import { Stage, Layer } from 'react-konva';
import { ReactReduxContext, Provider, connect } from "react-redux";
import MapImageContainer from './MapImage';
import LocationPointsContainer from './LocationPoints';
import {MapModes, CANVAS_HEIGHT, CANVAS_WIDTH} from '../../constants';
import PathLinesContainer from './PathLines';

//Sets up the Konva canvas and maintains the mouse cursor style when hovering over the canvas
class KonvaStage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cursorStyle: 'default'
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.props.fetchMapData();
    }

    handleMouseEnter() {
        if (this.props.mapMode ===MapModes.ADD_MODE) {
            this.setState({
                cursorStyle: 'crosshair'
            })
        }
    }

    handleMouseLeave() {
        this.setState({
            cursorStyle: 'default'
        })
    }


    handleClick(){
        this.setState({
            cursorStyle: 'default'
        })
    }
    render() {

        //The store is bridged into the stage component due to an issue with react-konva and react-redux
        return (
            <div style={{ cursor: this.state.cursorStyle }}>
                <ReactReduxContext.Consumer>
                    {({ store }) => (
                        <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
                            <Provider store={store}>
                                <Layer onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onMouseDown={this.handleClick}>
                                    <MapImageContainer />
                                    <PathLinesContainer />
                                    <LocationPointsContainer />
                                </Layer>
                            </Provider>
                        </Stage>
                    )}
                </ReactReduxContext.Consumer>
                {this.props.mapMode === MapModes.EDIT_MODE && 'Click and drag a location to move it'}
            </div>
        )
    }
}

export default connect()(KonvaStage);