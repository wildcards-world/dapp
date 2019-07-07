import { drizzleConnect } from "drizzle-react";
import React, { Component, Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment"
import { Tooltip } from 'rimble-ui'
import ContractData from "./ContractData";
import Countdown from "./Countdown"
import { useUsdPrice } from "./USDPriceContext"

declare global {
  interface Window { ethereum: any; }
}

window.ethereum = window.ethereum || {}

interface DisplayProps {
  combinedCollected: string,
  vitalikPriceEth: string,
  foreclosureTime: string,
}

const nullTime = {
  years: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  millisec: 0,
}

const calculateCountdown = (endDate: string) => {
  // let diff = (new Date(endDate)).
  let diff = (Date.parse((new Date(endDate)).toUTCString()) - Date.parse((new Date()).toUTCString())) / 1000;

  // clear countdown when date is reached
  if (diff <= 0) return nullTime;

  const timeLeft = nullTime;

  // calculate time difference between now and expected date
  if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years * 365.25 * 86400;
  }
  if (diff >= 86400) { // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }
  if (diff >= 3600) { // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.minutes = Math.floor(diff / 60);
    diff -= timeLeft.minutes * 60;
  }
  timeLeft.seconds = diff;

  return timeLeft;
}

// Functional component for sake of reactHooks...
const DisplayComponent: React.FunctionComponent<DisplayProps> = ({ combinedCollected, vitalikPriceEth: vitalikPriceEth, foreclosureTime }) => {

  const [countDown, setCountdown] = useState(nullTime);
  const usdPrice = useUsdPrice()
  const priceOfGorillaInUsd = parseFloat(vitalikPriceEth) * usdPrice
  const combinedCollectedUsd = parseFloat(combinedCollected) * usdPrice

  useEffect(() => {
    const date = calculateCountdown(foreclosureTime);
    setCountdown(date);
    const interval = setInterval(() => {
      if (foreclosureTime !== "N/A") {

        const date = calculateCountdown(foreclosureTime);
        setCountdown(date);
      }
    }, 1000);
    return () => clearTimeout(interval);
  }, [foreclosureTime]);

  const tooltipContent = () =>
    foreclosureTime !== "N/A" ?
      <div className="section">
        <p>The deposit for Vitalik will run out on {foreclosureTime}</p>
        <p>Time until deposit runs out in <Countdown countDown={countDown} /></p>
      </div>
      :
      <div className="section">
        <p>Loading deposit info</p>
      </div>

  return (
    <div className="section">
      <Tooltip message={tooltipContent()}>
        <p>
          Current Price: <ContractData contract="VitalikSteward" method="price" toEth /> ETH.{priceOfGorillaInUsd > 0 && ` (~ ${priceOfGorillaInUsd.toFixed(2)} USD)`}
          <br />
          Total Raised: {(parseFloat(combinedCollected) < 0) ? 'LOADING' : parseFloat(combinedCollected).toFixed(7/*7 digits is enough to see the price changing when asset is reasonably priced*/)} ETH.{combinedCollectedUsd > 0 && ` (~ ${combinedCollectedUsd.toFixed(2)} USD)`}
        </p>
      </Tooltip>
    </div>
  )
}
class ActionSection extends Component<{ contracts: any }, {}>  {
  utils: any
  contracts: any
  state: {
    patronageOwedKey: string
    totalCollectedKey: string
    patronageOwed: string
    combinedCollected: string
    foreclosureTime: string
    vitalikPrice: string
  }

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
      patronageOwed: this.getPatronageOwed(props),
      combinedCollected: this.getCombinedCellected(props),
      foreclosureTime: "N/A",
      vitalikPrice: this.getVitalikPriceEth(props),
    };
  }

  getTotalCollected(props: any) {
    if (props.contracts['VitalikSteward'].initialized && !!props.contracts['VitalikSteward']['totalCollected']['0x0'])
      return new this.utils.BN(props.contracts['VitalikSteward']['totalCollected']['0x0'].value);

    return "-1"
  }


  getPatronageOwed(props: any) {
    if (props.contracts['VitalikSteward'].initialized && !!props.contracts['VitalikSteward']['patronageOwed']['0x0'])
      return new this.utils.BN(props.contracts['VitalikSteward']['patronageOwed']['0x0'].value);

    return "-1"
  }

  getVitalikPriceEth(props: any) {
    if (props.contracts['VitalikSteward'].initialized && !!props.contracts['VitalikSteward']['price']['0x0'])
      return this.utils.fromWei(new this.utils.BN(props.contracts['VitalikSteward']['price']['0x0'].value), 'ether').toString()

    return "-1"
  }
  getCombinedCellected(props: any) {
    const patronageOwed = this.getPatronageOwed(props);
    const totalCollected = this.getTotalCollected(props);
    if (patronageOwed !== "-1" && totalCollected !== "-1")
      return this.utils.fromWei(totalCollected.add(patronageOwed), 'ether').toString();

    return "-1"
  }

  async updateCombineCollected(props: any) {
    const patronageOwed = this.getPatronageOwed(props);
    const combinedCollected = this.getCombinedCellected(props)

    // This is hacky, but just putting this here for now
    const vitalikPrice = this.getVitalikPriceEth(props);

    this.setState({
      patronageOwed,
      combinedCollected,
      vitalikPrice,
    });
  }
  // loadComponentData

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
      if (!this.getPatronageOwed(this.props).eq(this.getPatronageOwed(nextProps)) || this.state.combinedCollected === "-1") {
        this.updateCombineCollected(nextProps);
      }
    }
  }

  render() {
    const { combinedCollected, vitalikPrice, foreclosureTime } = this.state

    return (
      <DisplayComponent {...{ combinedCollected, vitalikPriceEth: vitalikPrice, foreclosureTime }} />
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
