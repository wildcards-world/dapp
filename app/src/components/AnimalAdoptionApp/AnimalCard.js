import React, { Component } from 'react'
import { Card } from 'rimble-ui'
import PropTypes from 'prop-types'
import AnimalImage from './AnimalImage'

class AnimalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        var Rhino = this.props.Rhino;

        const containerViewPort = {
            backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
            width: '100vw',
            height: '100vh'
        }
        const animalCardStyle={
            height: '80vh',
            width: '80vw',
            backgroundColor: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
            margin: 'auto',
        }

        return (
            <div style={containerViewPort}>
                <Card style={animalCardStyle} mx={'auto'} p={0} mt={2}>
                    <AnimalImage/>
                    Name {this.props.Rhino.name}
                </Card>
            </div>
        );
    }
}

AnimalCard.propTypes = {
    Rhino: PropTypes.object.isRequired,
};

export default AnimalCard;