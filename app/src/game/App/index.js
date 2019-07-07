import React, { Component, Fragment } from 'react'
import { drizzleConnect } from "drizzle-react";
import PropTypes from "prop-types";
import web3ProvideSwitcher from "../../web3ProvideSwitcher"

import Game from '../Game'
import MessageCard from '../MessageCard'
import './styles.css'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenOwner: false,
            playQuery: false,
        }
    }

    componentDidMount(){
        if (this.getQueryParameter('playgame') == 'true'){            
            this.setState({playQuery: true});
        }
    }

    getQueryParameter = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    render() {
        const { tokenOwner, playQuery } = this.state;
        return (
            <div className="container">
                <div>
                    {(tokenOwner === true || playQuery == true) ?
                        <Fragment>
                            <Game />
                            <MessageCard />
                        </Fragment>
                        :
                        <p>In order to play the game you need to be the owner of Vitalik the Gorilla</p>
                    }
                </div>
            </div>
        )
    }
}

export default App
