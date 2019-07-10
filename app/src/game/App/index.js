import React, { Component, Fragment } from 'react'
import Game from '../Game'
import MessageCard from '../MessageCard'
import './styles.css'
import OfflineContainer from "../../components/Offline"
import web3ProvideSwitcher from "../../web3ProvideSwitcher"
import { drizzleConnect } from "drizzle-react";
import PropTypes from "prop-types";

const verifyMessageNonce = async (userAddress, nonce, signature, web3) => {
  const idString = (new web3.utils.BN(nonce)).toString(16)
  const hashInput = '0'.repeat(64 - idString.length) + idString
  const hash = web3.utils.sha3(hashInput, { encoding: 'hex' })

  var signing_address = await web3.eth.personal.ecRecover(hash, signature)

  // check that the user address is the same as the recoverd address:
  const isValidNonce = userAddress.toUpperCase() === signing_address.toUpperCase()

  return isValidNonce
}

const computeNonceSignature = async (nonce, signingAccount, web3) => {
  // const idString = nonce.toString(16)
  const idString = (new web3.utils.BN(nonce)).toString(16)
  const hashInput = '0'.repeat(64 - idString.length) + idString
  const hash = web3.utils.sha3(hashInput, { encoding: 'hex' })

  var signature = await web3.eth.personal.sign(hash, signingAccount)

  return { signature, hash }
}

class App extends Component {

  static contextTypes = {
    drizzle: PropTypes.object
  }

  utils;
  context;
  contracts;
  web3;

  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.utils = context.drizzle.web3.utils;
    this.context = context

    this.state = {
      tokenOwnerAddress: '',
      tokenOwner: false,
      playQueryOverride: false,
      isWhoTheySayTheyAre: false,
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (this.state.tokenOwnerAddress !== '')
      return

    const tokenOwnerKey = this.context.drizzle.contracts.ERC721Full.methods.ownerOf.cacheCall(42)
    const tokenOwnerObj = nextProps.contracts['ERC721Full']['ownerOf'][tokenOwnerKey]

    if (!!tokenOwnerObj && !!tokenOwnerObj.value && this.state.tokenOwner !== tokenOwnerObj.value) {
      this.setState({
        ...this.state,
        tokenOwnerAddress: tokenOwnerObj.value
      })

      const account = nextProps.accounts[0]
      if (account.toUpperCase() === tokenOwnerObj.value.toUpperCase()) {
        const web3 = this.context.drizzle.web3
        const nonce = 6 // make this a random number or something (using the latest block hash or something would work well

        const { signature, hash } = await computeNonceSignature(nonce, account, web3)

        const isWhoTheySayTheyAre = await verifyMessageNonce(account, nonce, signature, web3)
        this.setState({
          ...this.state,
          isWhoTheySayTheyAre
        })
      }

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

  componentDidMount() {
    if (this.getQueryParameter('playgame') == 'true') {
      this.setState({ ...this.state, playQueryOverride: true });
    }

    web3ProvideSwitcher.switchToInjectedWeb3().then(connectedToInjectedWeb3 =>
      this.setState((state, props) => ({
        ...state,
        connectedToInjectedWeb3,
      }))
    )

  }

  render() {
    const { tokenOwnerAddress, playQueryOverride, isWhoTheySayTheyAre } = this.state;
    const { accounts } = this.props
    return (
      <div className="container">
        <OfflineContainer>
          <div>
            {(playQueryOverride || isWhoTheySayTheyAre) ?
              <Fragment>
                <Game />
                <MessageCard />
              </Fragment>
              :
              (tokenOwnerAddress === accounts[0]) ?
                <div>
                  <p>Your browser is telling us that you own the Vitalik Gorilla but extra verification is needed.</p>
                  <p>Please sign the message as proof.</p>
                </div>
                : <p>In order to play the game you need to be the owner of Vitalik the Gorilla</p>
            }
          </div>
        </OfflineContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contracts: state.contracts,
    accounts: state.accounts
  }
}

export default drizzleConnect(App, mapStateToProps)
