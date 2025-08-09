import React, { Component } from 'react';
import { getTouchPositions } from './utilities';
import { cubeWidth, faceArray } from './constants';

class Cube extends Component {
    constructor(props) {
        super(props);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.calculateFaceColors = this.calculateFaceColors.bind(this);
        
        if (Math.abs(this.props.translate[0]) +
            Math.abs(this.props.translate[1]) +
            Math.abs(this.props.translate[2]) === cubeWidth) {
            this.disableFaceRotation = true;
        }

        this.state = { 
            touchStarted: false, 
            faceColors: this.calculateFaceColors(this.props.translate) 
        };
    }

    calculateFaceColors(translate) {
        let faceColors = {};
        
        // Assign colors based on cube position for a solved Rubik's cube
        // Top face (white) - cubes with Y = -cubeWidth
        faceColors.top = translate[1] === -cubeWidth ? '#fff' : '#999';
        // Bottom face (yellow) - cubes with Y = cubeWidth  
        faceColors.bottom = translate[1] === cubeWidth ? '#FDCC09' : '#999';
        // Left face (red) - cubes with X = -cubeWidth
        faceColors.left = translate[0] === -cubeWidth ? '#DC422F' : '#999';
        // Right face (orange) - cubes with X = cubeWidth
        faceColors.right = translate[0] === cubeWidth ? '#FF6C00' : '#999';
        // Front face (green) - cubes with Z = cubeWidth
        faceColors.front = translate[2] === cubeWidth ? '#009D54' : '#999';
        // Back face (blue) - cubes with Z = -cubeWidth
        faceColors.back = translate[2] === -cubeWidth ? '#3D81F6' : '#999';
        
        return faceColors;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.translate !== this.props.translate) {
            this.setState({
                faceColors: this.calculateFaceColors(this.props.translate)
            });
        }
    }

    componentDidMount() {
        this.elem.addEventListener('mouseup', this.onTouchEnd);
        this.elem.addEventListener('touchend', this.onTouchEnd);
        this.elem.addEventListener('touchcancel', this.onTouchEnd);
    }

    componentWillUnmount() {
        this.elem.removeEventListener('mouseup', this.onTouchEnd);
        this.elem.removeEventListener('touchend', this.onTouchEnd);
        this.elem.removeEventListener('touchcancel', this.onTouchEnd);
    }

    cubePosition() {
        return (
            this.props.translate ? {
                transform: `translate3d(${this.props.translate[0]}px,${this.props.translate[1]}px,${this.props.translate[2]}px)
         rotate3d(${this.props.orientation[0]},${this.props.orientation[1]},${this.props.orientation[2]},${this.props.orientation[3]}deg)`
            } : {});
    }

    onTouchStart(eve, face) {
        if (this.disableFaceRotation)
            return true;
        eve.stopPropagation();
        this.props.faceRotationInit(
            { x: getTouchPositions(eve).clientX, y: getTouchPositions(eve).clientY },
            face
        );
    }

    render() {
        return (
            <div ref={elem => this.elem = elem}
                className="rubiks-cube" style={this.cubePosition()}>
                {faceArray.map((face, index) => {
                    return <div key={index}
                        onMouseDown={(evt) => this.onTouchStart(evt, face)}
                        onTouchStart={(evt) => this.onTouchStart(evt, face)}
                        className={'rubiks-face ' + face}
                        style={{ 'backgroundColor': this.state.faceColors[face] }}></div>
                })}
            </div>
        );
    }
}

export default Cube;
