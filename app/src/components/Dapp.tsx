import React, { Component, Fragment } from "react"
import TokenOverview from "./TokenOverview"
import OfflineContainer from "./Offline"
import BuyModal from './BuyModal'
import UpdateModal from './UpdateModal'
import gorillaImg1 from "../img/wildcardsimages/gorilla1.png"
import gorillaImg2 from "../img/wildcardsimages/gorilla2.png"
import gorillaImg3 from "../img/wildcardsimages/gorilla3.png"
import { drizzleConnect } from "drizzle-react";
import PropTypes from "prop-types";
import web3ProvideSwitcher from "../web3ProvideSwitcher"

class Dapp extends Component<any, any> {

  contracts: any
  utils: any
  inputs: any
  state: any

  static contextTypes = {
    drizzle: PropTypes.object
  }

  context: any;

  constructor(props: any, context: any) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;
    this.context = context

    this.state = { tokenOwner: '' }
  }

  async componentWillReceiveProps(nextProps: any) {
    const tokenOwnerKey = this.context.drizzle.contracts.ERC721Full.methods.ownerOf.cacheCall(42)
    const tokenOwnerObj = nextProps.contracts['ERC721Full']['ownerOf'][tokenOwnerKey]

    if (!!tokenOwnerObj && !!tokenOwnerObj.value && this.state.tokenOwner !== tokenOwnerObj.value) {
      this.setState({
        ...this.state,
        tokenOwner: tokenOwnerObj.value
      })
    }
  }

  render() {
    const { tokenOwner } = this.state
    const { accounts } = this.props
    const showDapp = web3ProvideSwitcher.providerInjected

    return (
      <Fragment>
        <OfflineContainer>
          {(tokenOwner === accounts[0]) ?
            < div className="header-23__right">
              <img className="header-23__img" src={gorillaImg1} style={{ minWidth: '30vw' }} />
              <div>
                <h2 style={{ margin: '0.2rem' }}>Your Gorilla Vitalik</h2>
                <Fragment>
                  <UpdateModal />
                  <TokenOverview />
                </Fragment>
              </div>
            </div>
            :
            <div className="header-23__right">
              <div className="gorilla-column">
                <div className='gorillas'>
                  <div className='gorilla-back gorilla-left'>
                    <img className="header-23__img" src={gorillaImg2} />
                    <div style={{ transform: 'translate(-5vw, 0vh)' }} >
                      <h2 style={{ margin: '0.2rem' }}>Simon</h2>
                      <h3 style={{ margin: 0, color: '#6bad3e', padding: '0.8rem 1.2rem', display: 'inline-block' }}>
                        COMING SOON
                    </h3>
                    </div>
                  </div>
                  <div className='gorilla-center-front'>
                    <img className="header-23__img" src={gorillaImg1} />
                    <div>
                      <div className='gorilla-purchase-container'>
                        <h2 style={{ margin: '0.2rem' }}>Vitalik</h2>
                        {showDapp ?
                          <BuyModal />
                          :
                          <h3 style={{ margin: 0, color: '#6bad3e', padding: '0.8rem 1.2rem', display: 'inline-block' }}>
                            Install <a href='https://metamask.io'>Metamask</a> to BUY Vitalik.
                            {/* TODO: test if this is moblie and recommend a web3 app for android/iphone (eg trust-wallet)*/}
                          </h3>
                        }
                        <TokenOverview />
                      </div>
                    </div>
                  </div>
                  <div className='gorilla-back gorilla-right'>
                    <img className="header-23__img " src={gorillaImg3} />
                    <div style={{ transform: 'translate(5vw, 0vh)' }}>
                      <h2 style={{ margin: '0.2rem' }}>Andy</h2>
                      <h3 style={{ margin: 0, color: '#6bad3e', padding: '0.8rem 1.2rem', display: 'inline-block' }}>
                        COMING SOON
                    </h3>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          }
        </OfflineContainer>
      </Fragment >
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    contracts: state.contracts,
    accounts: state.accounts
  }
}

const DappConnected = drizzleConnect(Dapp, mapStateToProps)

class DappWrapper extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <OfflineContainer>
          <DappConnected />
        </OfflineContainer>
      </Fragment >
    )
  }
}

export default DappWrapper

