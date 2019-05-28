import React, { Component, Fragment } from "react";
import { Card, Button, Modal, TextButton, Box, Flex, OutlineButton, TextArea, Heading, Icon, Text } from 'rimble-ui'
import PropTypes from 'prop-types'
import { drizzleConnect } from "drizzle-react";
import BuyForm from "./../../BuyForm";
import ContractData from "./../../ContractData";
import Rhino from '../../../img/rhino1.jpg'
import Rhino2 from '../../../img/rhino2.jpg'

class CollectionPage extends Component<{ clickHideCollection: any }, {}> {
    constructor(props:any) {
        super(props);
        this.state = {

        }
    }

    openModal(...args: any[]) {
      console.warn('This hasn\'t been defined yet:', args)
    }

    render() {
        const containerViewPort = {
            backgroundColor: ' white',
            // backgroundImage: 'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)',
            // background: ;
            width: '100vw',
            height: '100vh'
        } as React.CSSProperties;
        const noticeCardStyle = {
            boxShadow: '0px 10px 20px rgba(0,0,0,0.6)',
            height: '30vh',
            width: '96vw',
            background: "white",
            color: 'black',
            position: 'absolute',
            top: '8vh',
            left: '2vw'
        } as React.CSSProperties;
        const noticeCardStyle2 = {
            boxShadow: '0px 10px 20px rgba(0,0,0,0.6)',
            height: '30vh',
            width: '96vw',
            background: "white",
            color: 'black',
            position: 'absolute',
            top: '40vh',
            left: '2vw'
        } as React.CSSProperties;
        const extraTextStyle = {
            color: 'White'
            , borderRadius: '4px'
        } as React.CSSProperties;
        const HeadingStyle = {
            fontWeight: 'bold'
            , borderRadius: '4px'
            , textAlign: 'center'
        } as React.CSSProperties;
        const imageStyle = {
            height: '30vh',
            width: '100%',
            objectFit: 'cover'
        }  as React.CSSProperties;

        const headerStyle = {
            backgroundColor: "#333333",
            borderBottom: '2px solid black',
            width: '100%',
            height: '8vh',
            position: "absolute",
            top: 0,
            zIndex: 1000
        } as React.CSSProperties;

        return (
            <div style={containerViewPort}>
                <div style={headerStyle}>
                    <Flex>
                        <Box p={1} width={1} color="white" onClick={this.props.clickHideCollection}>
                            <Heading.h3  >
                                <div style={{ textAlign: 'center' }}>
                                    Collection
                                </div>
                            </Heading.h3 >
                        </Box>
                    </Flex>
                </div>
                <Card style={noticeCardStyle} mx={'auto'} p={0} mt={2}>
                    <Flex>
                        <Box width={1 / 3} color="black" onClick={this.props.clickHideCollection}>
                            <img src={Rhino} className='' alt='intothewild' style={imageStyle} />
                        </Box>
                        <Box px={1} width={2 / 3} color="black" onClick={this.props.clickHideCollection}>
                            <Heading.h3 px={1} >
                                
                                    Vitalik
                                
                            </Heading.h3 >
                            <Text px={1} style={{ color: '#333' }}>
                                0x04deF7535192CE302e87...
                            </Text>
                            <Flex >
                                <Box width={1 / 2} color="black" onClick={this.props.clickHideCollection}>
                                    <Heading.h3  px={0.5}>
                                        
                                            Eth 110
                                 
                                    </Heading.h3 >
                                </Box>
                                <Box width={1 / 2} color="black" onClick={this.props.clickHideCollection}>
                                    <Heading.h3 px={0.5} >
                                        
                                            Male
                                 
                                    </Heading.h3 >
                                </Box>
                            </Flex>
                            <Button onClick={this.openModal} icon="Info" mx={'auto'}  iconpos="right" bg='#12317E' fullWidth>
                            Read More
                           </Button>
                        </Box>
                    </Flex>
                </Card>
                <Card style={noticeCardStyle2} mx={'auto'} p={0} mt={2}>
                    <Flex>
                        <Box width={1 / 3} color="black" onClick={this.props.clickHideCollection}>
                            <img src={Rhino2} className='' alt='intothewild' style={imageStyle} />
                        </Box>
                        <Box px={1} width={2 / 3} color="black" onClick={this.props.clickHideCollection}>
                            <Heading.h3 px={1} >
                                
                                    Andrew
                                
                            </Heading.h3 >
                            <Text px={1} style={{ color: '#333' }}>
                                0x848711cBb8D6Ebf6fa55...
                            </Text>
                            <Flex >
                                <Box width={1 / 2} color="black" onClick={this.props.clickHideCollection}>
                                    <Heading.h3 px={1} >
                                   
                                            Eth 100
                      
                                    </Heading.h3 >
                                </Box>
                                <Box width={1 / 2} color="black" onClick={this.props.clickHideCollection}>
                                    <Heading.h3  px={1}>
                             
                                            Male
                  
                                    </Heading.h3 >
                                </Box>
                            </Flex>
                            <Button onClick={this.openModal} icon="Info" mx={'auto'}  iconpos="right" bg='#12317E' fullWidth>
                            Read More
                           </Button>
                        </Box>
                    </Flex>
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

export default drizzleConnect(CollectionPage, mapStateToProps);
