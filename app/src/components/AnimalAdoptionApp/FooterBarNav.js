import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FooterBarNav extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const footerStyle = {
            backgroundColor: "#333333",
            borderTop: '1px solid white',
            width: '100%',
            height: '40px',
            position: 'absolute',
            bottom: 0
        }
        
        const winningsStyle = {
            color:'white',
            position: 'absolute',
            right:20, 
            bottom: 10        
        }

        return (
            <div style={footerStyle}>            
                <span style={winningsStyle}>
                    Winnings: 
                    <span style={{color:'cyan'}}>
                        ${this.props.winnings}                       
                    </span>
                </span>
            </div>
        );
    }
}

FooterBarNav.propTypes = {
    winnings: PropTypes.number.isRequired,
};

export default FooterBarNav;