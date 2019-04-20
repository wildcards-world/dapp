import React, { Component, Fragment } from "react";
import { Card, Button, Modal, TextButton, Box, Flex, OutlineButton, Text, Heading } from 'rimble-ui'
import PropTypes from 'prop-types'
import AnimalImage from './AnimalImage'
import Rhino1 from '../../img/rhino1.jpg'
import Rhino2 from '../../img/rhino2.jpg'
import Rhino3 from '../../img/rhino3.jpg'
import Rhino4 from '../../img/rhino4.jpg'
import Rhino5 from '../../img/rhino5.jpg'
import Rhino6 from '../../img/rhino6.jpg'
import Rhino7 from '../../img/rhino7.jpg'
import Rhino8 from '../../img/rhino8.jpg'
import Rhino9 from '../../img/rhino9.jpg'
import Rhino10 from '../../img/rhino10.jpg'
import { drizzleConnect } from "drizzle-react";
import BuyForm from "./../BuyForm";
import ContractData from "./../ContractData";

class AnimalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
            , rhinoImages: [
                Rhino1
                , Rhino2
                , Rhino3
                , Rhino4
                , Rhino5
                , Rhino6
                , Rhino7
                , Rhino8
                , Rhino9
                , Rhino10
            ]
        }
    }

    closeModal = (e) => {
        e.preventDefault()
        this.setState((state, props) => ({
            isOpen: false
        }))
    }

    openModal = (e) => {
        e.preventDefault()
        this.setState((state, props) => ({
            isOpen: true
        }))
    }

    render() {
        var Rhino = this.props.Rhino;

        const containerViewPort = {
            backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
            width: '100vw',
            height: '100vh'
        }
        const animalCardStyle = {
            height: '80vh',
            width: '80vw',
            backgroundColor: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
            margin: 'auto',
        }

        return (
            <div style={containerViewPort}>
                <Card style={animalCardStyle} mx={'auto'} p={0} mt={2}>
                    <AnimalImage
                        img={this.state.rhinoImages[Rhino.id]}
                    />
                    Name: {this.props.Rhino.name}
                    <Button onClick={this.openModal} fullWidth>
                        Adopt Rhino
                    </Button>
                </Card>
                <Modal isOpen={this.state.isOpen} >
                    <Card p={0} style={{ width: '76vw' }} style={{ transform: 'translate(' + Rhino.id * 100 + 'vw,0)' }}>
                        <TextButton
                            icononly
                            icon={'Close'}
                            color={'moon-gray'}
                            position={'absolute'}
                            top={0}
                            right={0}
                            mt={3}
                            mr={3}
                            onClick={this.closeModal}
                        />
                        <Box p={4} mb={3}>
                            <Heading.h3>Confirm Adoption</Heading.h3>
                            <Text>
                                Are you sure you want to Adopt?
              </Text>
                            <Fragment>
                                {window.ethereum !== undefined ? (
                                    <Fragment>
                                        <p>You will pay <ContractData contract="ArtSteward" method="price" toEth /> ETH.<br /> Add your own sale price and amount you want to deposit for patronage: </p>
                                        <BuyForm contract="Rhino" method="buy" labels={["Your Initial Sale Price"]} valueLabel="Your Initial Deposit" sendArgs={{}} />
                                    </Fragment>
                                ) : (
                                        <Fragment>
                                            [In order to buy the artwork and become a patron you need to have a web3/Ethereum-enabled browser. Please download
            the <a href="https://metamask.io">MetaMask Chrome extension</a> or open in an Ethereum mobile browser.]
          </Fragment>
                                    )}
                            </Fragment>
                        </Box>

                        <Flex px={4} py={3} borderTop={1} borderColor={'#E8E8E8'} justifyContent={'flex-end'}>
                            <OutlineButton>Cancel</OutlineButton>
                            <Button ml={3}>Confirm</Button>
                        </Flex>
                    </Card>
                </Modal>
            </div>
        );
    }
}

AnimalCard.contextTypes = {
    drizzle: PropTypes.object,
};

AnimalCard.propTypes = {
    Rhino: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        contracts: state.contracts,
        drizzleStatus: state.drizzleStatus,
        web3: state.web3,
    };
};

export default drizzleConnect(AnimalCard, mapStateToProps);

// export default AnimalCard;