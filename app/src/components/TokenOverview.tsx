import { drizzleConnect } from "drizzle-react";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment"

import ContractForm from "./ContractForm";
import DepositWeiForm from "./DepositWeiForm";
import ContractData from "./ContractData";

declare global {
  interface Window { ethereum: any; }
}

window.ethereum = window.ethereum || {}

class ActionSection extends Component<{ contracts: any }, {}>  {
  utils: any
  contracts: any
  state: any

  static contextTypes = {
    drizzle: PropTypes.object
  }

  context: any;
  constructor(props: any, context: any) {
    super(props, context)
    this.utils = context.drizzle.web3.utils;
    this.contracts = context.drizzle.contracts;
    this.state = {
      patronageOwedKey: context.drizzle.contracts.VitalikSteward.methods.patronageOwed.cacheCall(),
      totalCollectedKey: context.drizzle.contracts.VitalikSteward.methods.totalCollected.cacheCall(),
      patronageOwed: -1,
      combinedCollected: -1,
      foreclosureTime: "N/A"
    };
  }

  getTotalCollected(props: any) {
    return new this.utils.BN(props.contracts['VitalikSteward']['totalCollected'][this.state.totalCollectedKey].value);
  }

  async updateCombineCollected(props: any) {
    const patronageOwed = this.getPatronageOwed(props);
    const totalCollected = this.getTotalCollected(props);
    const combinedCollected = this.utils.fromWei(totalCollected.add(patronageOwed), 'ether').toString();
    this.setState({
      patronageOwed,
      combinedCollected,
    });
  }

  getPatronageOwed(props: any) {
    return new this.utils.BN(props.contracts['VitalikSteward']['patronageOwed'][this.state.patronageOwedKey].value);
  }

  async componentWillReceiveProps(nextProps: any) {
    if (this.props.contracts['VitalikSteward']['price']['0x0'] !== nextProps.contracts['VitalikSteward']['price']['0x0']) {
      if (nextProps.contracts['VitalikSteward']['price']['0x0'].value === '0') {
        this.setState({
          foreclosureTime: "N/A"
        });
      } else {
        const foreclosureTime = moment(parseInt(await this.contracts.VitalikSteward.methods.foreclosureTime().call()) * 1000).toString();
        this.setState({ foreclosureTime });
      }
    }

    if (this.state.patronageOwedKey in this.props.contracts['VitalikSteward']['patronageOwed']
      && this.state.patronageOwedKey in nextProps.contracts['VitalikSteward']['patronageOwed']
      && this.state.totalCollectedKey in this.props.contracts['VitalikSteward']['totalCollected']
      && this.state.totalCollectedKey in nextProps.contracts['VitalikSteward']['totalCollected']) {
      if (!this.getPatronageOwed(this.props).eq(this.getPatronageOwed(nextProps)) || this.state.combinedCollected === -1) {
        this.updateCombineCollected(nextProps);
      }
    }
  }

  render() {
    return (
      <div className="section">
        <p>Current Price: <ContractData contract="VitalikSteward" method="price" toEth /> ETH.<br />Total Raised: {(this.state.combinedCollected < 0) ? 'LOADING' : this.state.combinedCollected} ETH.</p>
      </div>
    )
  }
}

/*
 * Export connected component.
 */

const mapStateToProps = (state: any) => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(ActionSection, mapStateToProps);
