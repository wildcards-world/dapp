import React, { Component, Fragment } from "react";
import { Card, Button, Modal, TextButton, Box, Flex, OutlineButton, Text, Heading, Icon } from 'rimble-ui'
import PropTypes from 'prop-types'
import AnimalImage from './AnimalImage'
import Rhino1 from '../../img/rhino4.jpg'
import Rhino2 from '../../img/rhino1.jpg'
import Rhino3 from '../../img/rhino3.jpg'
import Rhino4 from '../../img/rhino2.jpg'
import Rhino5 from '../../img/rhino5.jpg'
import Rhino6 from '../../img/rhino6.jpg'
import Rhino7 from '../../img/rhino7.jpg'
import Rhino8 from '../../img/rhino8.jpg'
import Rhino9 from '../../img/rhino9.jpg'
import Rhino10 from '../../img/rhino10.jpg'
import { drizzleConnect } from "drizzle-react";
import BuyForm from "./../BuyForm";
import AdoptAnimalForm from "./AdoptAnimalForm";
import ContractData from "./../ContractData";
import { isAbsolute } from "path";

class AnimalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
            , isOpenMore: false
            , display: 'none'
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

    morecloseModalMore = (e) => {
        // e.preventDefault()
        this.setState((state, props) => ({
            // isOpenMore: false,
            display: 'none'
        }))
    }

    moreopenModalMore = (e) => {
        // e.preventDefault()
        this.setState((state, props) => ({
            // isOpenMore: true,
            display:'block'
        }))
    }

    render() {
        var Rhino = this.props.Rhino;

        const containerViewPort = {
            backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)',
            // backgroundImage: 'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)',
            // background: ;
            width: '100vw',
            height: '100vh'
        }
        const animalCardStyle = {
            boxShadow: '0px 10px 20px rgba(0,0,0,0.6)',
            height: '70vh',
            width: '80vw',
            backgroundColor: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
            position: 'absolute',
            top: '5vh',
            left: '10vw'
        }
        const nameStyle = {
            color: 'White'
            , position: 'absolute'
            , top: 5
            , left: 15
            , borderRadius: '4px'
        }
        const priceStyle = {
            position: 'absolute'
            , fontWeight: 'bold'
            , bottom: 5
            , right: 15
            , borderRadius: '4px'
        }
        var rhinocontract = "Rhino" + (Rhino.id + 1)

        return (
            <div style={containerViewPort}>
                <Card style={animalCardStyle} mx={'auto'} p={0} mt={2} >
                <div style={{ display: this.state.display, zIndex: 1000, position: 'absolute', top: '0', 'backgroundColor': 'rgba(250,250,250,0.7)', width: '100%', height: '100%' }} onClick={this.morecloseModalMore}   >
                        <TextButton
                            icononly
                            icon={'Close'}
                            color={'moon-gray'}
                            position={'absolute'}
                            top={0}
                            right={0}
                            mt={3}
                            mr={3}
                            onClick={this.morecloseModalMore}
                        />
                        <Box p={4} mb={3}>
                            <Heading.h4>More Information of {Rhino.name} </Heading.h4>
                            <Text>
                                Owner: {Rhino.current_owner} <br />
                                Time Held: {Rhino.time_held} <br />
                                Highest Paid Price: {Rhino.highest_price} <br />
                                Generated Revenue: {Rhino.revenue_generated} <br />

                            </Text>
                            <Fragment>
                                <p>
                                    Age: {Rhino.age} <br />
                                    Lineage: {Rhino.lineage} <br />
                                    Weight: {Rhino.weight}kg <br />
                                    Gender: {Rhino.is_female ? "Female" : "Male"} <br />
                                </p>

                            </Fragment>


                        </Box>
                    </div>
                    <AnimalImage openModal={this.moreopenModalMore}   
                        img={this.state.rhinoImages[Rhino.id]}
                    />
                    <Heading.h3 style={nameStyle} bg={'rgba(0,0,0,0.5)'} p={3}>
                        {this.props.Rhino.name}
                    </Heading.h3>
                    <Heading.h1 style={priceStyle} color={'#fff'} p={3}>
                        Eth <ContractData contract={rhinocontract} method="price" toEth />
                    </Heading.h1>
                    
                    <center>
                        <Button style={{ marginTop: '3vh' }} onClick={this.openModal} icon="AddBox" mx={'auto'} iconpos="right" bg='#444'>
                            Adopt Rhino
                        </Button>
                    </center>

                </Card>
                <Modal isOpen={this.state.isOpen} >
                    <Card p={0} style={{ width: '76vw' }} style={{ transform: 'translate(' + (Rhino.id + 1) * 100 + 'vw,0)' }}>
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
                                Please Confirm that you would like to adopt {this.props.Rhino.name}
                            </Text>
                            <Fragment>
                                <Fragment>

                                    <p>To have {this.props.Rhino.name} part of your safari collection you will need to pay <ContractData contract={rhinocontract} method="price" toEth /> ETH.<br /> Set your own sale price and some more to cover your Rhinos expenses: </p>
                                    <AdoptAnimalForm contract={rhinocontract} method="buy" labels={["The cost for someone to buy from you"]} valueLabel="Your Initial Deposit" sendArgs={{}} />


                                </Fragment>
                            </Fragment>
                        </Box>

                    </Card>
                </Modal>
                {/* <div style={{display: this.state.isOpenMore ? "inline-block" : 'none', zIndex: 9}} >
                    <Card p={0} style={{ width: '76vw' }} style={{ transform: 'translate(' + (Rhino.id + 1) * 100 + 'vw,0)' }}>
                        <TextButton
                            icononly
                            icon={'Close'}
                            color={'moon-gray'}
                            position={'absolute'}
                            top={0}
                            right={0}
                            mt={3}
                            mr={3}
                            onClick={this.closeModalMore}
                        />
                        <Box p={4} mb={3}>
                            <Heading.h4>More Information of {Rhino.name} </Heading.h4>
                            <Text>
                                Owner: {Rhino.current_owner} <br />
                                Time Held: {Rhino.time_held} <br />
                                Highest Paid Price: {Rhino.highest_price} <br />   
                                Generated Revenue: {Rhino.revenue_generated} <br />   
                                                             
                            </Text>
                            <Fragment>
                                <p>
                                    Age: {Rhino.age} <br />
                                    Lineage: {Rhino.lineage} <br />
                                    Weight: {Rhino.weight}kg <br />
                                    Gender: {Rhino.is_female ? "Female" : "Male"} <br />
                                </p>

                            </Fragment>
                        </Box>
                    </Card>
                </div> */}
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