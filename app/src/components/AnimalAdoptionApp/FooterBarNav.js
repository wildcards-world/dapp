import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Icon } from 'rimble-ui';
import Binos from '../../img/extras/binos.png'

class FooterBarNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const footerStyle = {
            backgroundColor: "#333333",
            borderTop: '2px solid black',
            width: '100%',
            height: '8vh',
            position: 'absolute',
            bottom: 0,
            zIndex: 1000
        }
        const imageStyle = {
            height: '8vh',
            width: '8vh',
            objectFit: 'cover'        
        }

        return (
            <div style={footerStyle}>
                <Flex>
                    <Box p={3} width={1 / 2} color="white">
                        <center>
                        {/* <img src={Binos} className='' alt='intothewild'  style={imageStyle}/> */}
                            <Icon name="Home" />
                        </center>
                    </Box>
                    <Box p={3} width={1 / 2} color="white">
                        <center>
                            <Icon name="LibraryBooks" />
                        </center>
                    </Box>
                </Flex>
            </div>
        );
    }
}

FooterBarNav.propTypes = {
    // winnings: PropTypes.number.isRequired,
};

export default FooterBarNav;