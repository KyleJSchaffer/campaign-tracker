import React, { Component } from 'react';
import { Image } from 'react-konva';
import map from '../../../images/map.jpg';
import { MapModes, CANVAS_HEIGHT, CANVAS_WIDTH} from '../../../constants';

class MapImage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  //Load the image and save it in the state
  componentDidMount() {
    var image = new window.Image();
    image.src = map;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  //Add a new location on click if the map is in add_mode
  handleClick(e) {
    if (this.props.mapMode === MapModes.ADD_MODE) {
      const newLocationPoint = e.target.getStage().getPointerPosition();
      //divide x and y by the canvas width and height to normalize the values from 0 to 1
      const normalizedPoint = {x: newLocationPoint.x/CANVAS_WIDTH, y: newLocationPoint.y/CANVAS_HEIGHT};
      this.props.addLocation(normalizedPoint.x, normalizedPoint.y);
    }
  }

  render() {
    return (
      <Image width={CANVAS_WIDTH} height={CANVAS_HEIGHT} image={this.state.image} onMouseDown={this.handleClick} />

    );
  }
}

export default MapImage; 