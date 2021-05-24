import React from 'react';
import SinglePathLine from './SinglePathLine';
import {Group} from 'react-konva';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../../constants';

//Passes the information for each path from the store to be drawn as a line on the map
class PathLines extends React.Component {

    render() {
        let pathLines = [];
        for (let pathID in this.props.paths) {
            const path = this.props.paths[pathID];
            const pathPoints = [
                path.startPos.xPos * CANVAS_WIDTH,
                path.startPos.yPos * CANVAS_HEIGHT,
                path.endPos.xPos * CANVAS_WIDTH,
                path.endPos.yPos * CANVAS_HEIGHT
            ]
            pathLines.push(
                <SinglePathLine
                    key={pathID}
                    id={pathID}
                    points={pathPoints}
                    mapMode={this.props.mapMode}
                    isSelected = {pathID===this.props.selectedPath}
                    selectPath={this.props.selectPath}
                    isNew = {path.isNew}
                />
            )
        }
        return (
            <Group>{pathLines}</Group>            
        )
    }
}

export default PathLines;