import React, { Component, Fragment } from "react";
import { Card, Button, Modal, TextButton, Box, Flex, OutlineButton, TextArea, Heading, Icon } from 'rimble-ui'
import PropTypes from 'prop-types'
import AnimalImage from './AnimalImage'
import LandroverSafari from '../../img/extras/intothewild.png'
import { drizzleConnect } from "drizzle-react";
import BuyForm from "./../BuyForm";
import ContractData from "./../ContractData";

class ClosingInformationCard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  }

  render() {

    const containerViewPort = {
      backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)',
      // backgroundImage: 'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)',
      // background: ;
      width: '100vw',
      height: '100vh'
    }
    const noticeCardStyle = {
      boxShadow: '0px 10px 20px rgba(0,0,0,0.6)',
      height: '80vh',
      width: '80vw',
      background: "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898",
      backgroundBlendMode: "multiply,multiply",
      color: 'white',
      position: 'absolute',
      top: '5vh',
      left: '10vw'
    }
    const extraTextStyle = {
      color: 'White'
      , borderRadius: '4px'
    }
    const HeadingStyle = {
      fontWeight: 'bold'
      , borderRadius: '4px'
    }

    const imageStyle = {
      height: '20vh',
      width: '100%',
      objectFit: 'cover'
      , position: 'absolute'
      , bottom: 0
    } as React.CSSProperties

    return (
      <div style={containerViewPort}>
        <Card style={noticeCardStyle} mx={'auto'} p={0} mt={2}>
          <Heading.h1 style={HeadingStyle} color={'#fff'} p={3}>
            That's it
                        </Heading.h1>
          <Heading.h3 style={extraTextStyle} bg={'rgba(0,0,0,0.5)'} p={3}>
            There are no more Rhinos
                        </Heading.h3>
          <Heading.h4 p={3}>
            Make a difference and donate to the Wild life fund
                        </Heading.h4>

          <img src={LandroverSafari} className='' alt='intothewild' style={imageStyle} />

          {/* <center>
                        <Button style={{marginTop: '3vh'}} onClick={this.openModal} icon="AddBox" mx={'auto'}  iconpos="right" bg='#444'>
                            Adopt Rhino
                        </Button>
                    </center> */}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    contracts: state.contracts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
  };
};

export default drizzleConnect(ClosingInformationCard, mapStateToProps);
