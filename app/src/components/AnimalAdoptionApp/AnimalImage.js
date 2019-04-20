import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AnimalImageFile from '../../img/rhino13.jpg'

class AnimalImage extends Component {
    

    constructor(props){
        super(props);
    }

    render() {
        const imageStyle = {
            height: '100%',
            width: '100%'
        }

        return (
            <div>            
              <img src={AnimalImageFile} className='' alt='Endagered Animal'  style={imageStyle}/>
            </div>
        );
    }
}

AnimalImage.propTypes = {
    // winnings: PropTypes.number.isRequired,
};

export default AnimalImage;