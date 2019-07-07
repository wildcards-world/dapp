import { drizzleConnect } from "drizzle-react";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import ContractData from "./ContractData";

import { getUSDValue } from "../Actions";

class PriceSection extends Component<{ contracts: any }> {
  utils: any
  contracts: any
  state: any

  static contextTypes = {
    drizzle: PropTypes.object
  }

  context: any;
  constructor(props: any, context: any) {
    super(props);
    this.utils = context.drizzle.web3.utils;
    this.contracts = context.drizzle.contracts;
    this.state = {
      USD: -1,
      artworkPriceKey: context.drizzle.contracts.VitalikSteward.methods.price.cacheCall(),
      patron: null,
      patronKey: context.drizzle.contracts.ERC721Full.methods.ownerOf.cacheCall(42),
      timeAcquiredKey: context.drizzle.contracts.VitalikSteward.methods.timeAcquired.cacheCall(),
      timeHeldKey: null,
      currentTimeHeld: 0,
      currentTimeHeldHumanized: ""
    };
  }

  async updateUSDPrice(props: any) {
    const price = this.utils.fromWei(this.getArtworkPrice(props), 'ether');
    const USD = await getUSDValue(price);
    this.setState({ USD });
  }

  async updateTimeHeld(props: any, timeHeldKey: any) {
    const date = new Date();
    let currentTimeHeld = parseInt(this.getTimeHeld(props, timeHeldKey)) + ((date.getTime() / 1000) - parseInt(this.getTimeAcquired(props)));

    /*
    note: this is a hack. smart contract didn't store timeAcquired when steward started. 
    Thus: time held will be very large. It needs to be reduced.
    */
    if (props.contracts['ERC721Full']['ownerOf'][this.state.patronKey].value === this.contracts.VitalikSteward.address) {
      const deployedtime = new this.utils.BN('1553202847');
      currentTimeHeld = new this.utils.BN(currentTimeHeld).sub(deployedtime).toString();
    }

    const currentTimeHeldHumanized = moment.duration(currentTimeHeld, 'seconds').humanize();
    this.setState({
      currentTimeHeld,
      currentTimeHeldHumanized,
    });
  }

  async updatePatron(props: any) {
    const patron = this.getPatron(props);
    // update timeHeldKey IF owner updated
    const timeHeldKey = this.contracts.VitalikSteward.methods.timeHeld.cacheCall(patron);
    this.setState({
      currentTimeHeld: 0,
      timeHeldKey,
      patron
    });
  }

  getArtworkPrice(props: any) {
    return new this.utils.BN(props.contracts['VitalikSteward']['price']['0x0'].value);
  }

  getPatron(props: any) {
    return props.contracts['ERC721Full']['ownerOf'][this.state.patronKey].value;
  }

  getTimeAcquired(props: any) {
    return props.contracts['VitalikSteward']['timeAcquired'][this.state.timeAcquiredKey].value;
  }

  getTimeHeld(props: any, timeHeldKey: any) {
    return props.contracts['VitalikSteward']['timeHeld'][timeHeldKey].value;
  }

  async componentWillUpdate(nextProps: any, nextState: any) {
    if (this.state.patronKey in this.props.contracts['ERC721Full']['ownerOf']
      && this.state.patronKey in nextProps.contracts['ERC721Full']['ownerOf']) {
      if (this.getPatron(this.props) !== this.getPatron(nextProps) || this.state.patron === null) {
        this.updatePatron(nextProps);
      }
    }

    /* todo: fetch new exchange rate? */
    if (this.state.artworkPriceKey in this.props.contracts['VitalikSteward']['price']
      && this.state.artworkPriceKey in nextProps.contracts['VitalikSteward']['price']) {
      if (!this.getArtworkPrice(this.props).eq(this.getArtworkPrice(nextProps)) || this.state.USD === -1) {
        await this.updateUSDPrice(nextProps);
      }
    }

    if (this.state.timeHeldKey in this.props.contracts['VitalikSteward']['timeHeld']
      && this.state.timeHeldKey in nextProps.contracts['VitalikSteward']['timeHeld']) {
      if (this.getTimeHeld(this.props, this.state.timeHeldKey) !== this.getTimeHeld(nextProps, this.state.timeHeldKey) || this.state.currentTimeHeld === 0) {
        this.updateTimeHeld(nextProps, this.state.timeHeldKey);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <h2>Valued at: <ContractData contract="VitalikSteward" method="price" toEth /> ETH (~${this.state.USD} USD) </h2>
        Current Patron: <ContractData contract="ERC721Full" method="ownerOf" methodArgs={[42]} /><br />
        Total Time Held: {this.state.currentTimeHeldHumanized}
      </Fragment>
    )
  }
}

/*
 * Export connected component.
 */

const mapStateToProps = (state: any) => {
  return {
    accounts: state.accounts,
    contracts: state.contracts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
  };
};

export default drizzleConnect(PriceSection, mapStateToProps);
