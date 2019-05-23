import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AnimalImage extends Component<{ img: any, openModal: any }, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const imageStyle = {
      height: '70vh',
      width: '100%',
      objectFit: 'cover'
    } as React.CSSProperties

    return (
      <div>
        <img src={this.props.img} className='' alt='Endagered Animal' style={imageStyle} onClick={this.props.openModal} />
        {/* <img src='/img/Rhino.png' className='' alt='Endagered Animal'  style={imageStyle}/> */}
      </div>
    );
  }
}

export default AnimalImage;
