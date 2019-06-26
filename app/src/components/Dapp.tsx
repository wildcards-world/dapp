import React, { Component, Fragment } from "react"
import TokenOverview from "./TokenOverview"
import OfflineContainer from "./Offline"
import BuyModal from './BuyModal'
import UpdateModal from './UpdateModal'
import gorillaImg from "../img/wildcardsimages/gorilla.png"
import { drizzleConnect } from "drizzle-react";
import PropTypes from "prop-types";

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

    return (
      <Fragment>
        <OfflineContainer>
          {(tokenOwner === accounts[0]) ?
            < div className="header-23__right">
              <img className="header-23__img" src={gorillaImg} style={{ minWidth: '30vw' }} />
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
              <img className="header-23__img" src={gorillaImg} style={{ minWidth: '30vw' }} />
              <div>
                <h2 style={{ margin: '0.2rem' }}>Vitalik</h2>
                <Fragment>
                  <BuyModal />
                  <TokenOverview />
                </Fragment>
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

