
import React, { Component, Fragment } from "react";
import { Card, Button, Modal, TextButton, Box, Flex, OutlineButton, TextArea, Heading, Icon } from 'rimble-ui'
import PropTypes from 'prop-types'
import AnimalImage from './AnimalImage'
import Rhino1 from '../../img/rhino1.jpg'
import { drizzleConnect } from "drizzle-react";
import BuyForm from "./../BuyForm";
import ContractData from "./../ContractData";
import LandroverSafari from '../../img/extras/intothewild.png'
import LogoImg from '../../img/logo/rhino-final.png'

class OpeningInformationCard extends Component {
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
      height: '88vh',
      width: '96vw',
      background: "#989898",
      color: 'white',
      position: 'absolute',
      top: '0.5vh',
      left: '2vw'
    }
    const extraTextStyle = {
      color: 'White'
      , borderRadius: '4px'
      , textAlign: 'center'
    }
    const swipeTextStyle = {
      color: '#eee'
      , borderRadius: '4px'
      , textAlign: 'center'
    }
    const HeadingStyle = {
      fontWeight: 'bold'
      , borderRadius: '4px'
      , textAlign: 'center'
    }
    const imageStyle = {
      height: '20vh',
      width: '100%',
      objectFit: 'cover'
      , position: 'absolute'
      , bottom: '2vh'
    } as React.CSSProperties
    const logoStyle = {
      height: '100%',
      width: '32vw',
      objectFit: 'cover'
    } as React.CSSProperties

    return (
      <div style={containerViewPort}>
        <Card style={noticeCardStyle} mx={'auto'} p={0} mt={2}>
          <Heading.h1 style={HeadingStyle} color={'#fff'} p={2}>
            <span>
              WILD CARDS
                            </span>
          </Heading.h1>
          <span>
            <img src={LogoImg} className='' alt='intothewild' style={logoStyle} />
          </span>
          <Heading.h3 style={extraTextStyle} p={1.4}>
            Wild Cards is an always for sale tokenisation of endangered animals
                        </Heading.h3>
          <Heading.h4 style={swipeTextStyle} p={0}>
            Swipe right to view species
                        </Heading.h4>
          {/* <Heading.h3 style={extraTextStyle} bg={'rgba(0,0,0,0.5)'} p={3}>
                            There are no more Rhinos
                        </Heading.h3>         
                        <Heading.h4 p={3}>
                            Make a difference and donate to the Wild life fund
                        </Heading.h4> */}
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

export default drizzleConnect(OpeningInformationCard, mapStateToProps);
