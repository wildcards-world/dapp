import { drizzleConnect } from "drizzle-react";
import PropTypes from "prop-types";
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { Component, Fragment } from "react";
import { Button, Modal, Card, Box, Heading, Text, Flex, Loader, Input } from 'rimble-ui'
import web3ProvideSwitcher from "../web3ProvideSwitcher"
import TokenOverview from "./TokenOverview"

interface state {
  contractFunctions: any,
  isOpen: boolean,
  connectedToInjectedWeb3: boolean,
  currentTxIndex: number
}

class BuyModal extends Component<any, any> {
  contracts: any
  utils: any
  inputs: any
  state: state

  static contextTypes = {
    drizzle: PropTypes.object
  }

  context: any;

  constructor(props: any, context: any) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;

    // Get the contract ABI, if it is undefined return an empty array
    const abi = (!!this.contracts.VitalikSteward) ? this.contracts.VitalikSteward.abi : [];

    this.inputs = [];
    let contractFunctions: any = {};

    // Iterate over abi for correct function.
    for (let i = 0; i < abi.length; i++) {
      if (abi[i].name === 'buy') {
        this.inputs = abi[i].inputs;

        for (let j = 0; j < this.inputs.length; j++) {
          contractFunctions[this.inputs[j].name] = "";
        }

        break;
      }
    }

    this.state = {
      contractFunctions,
      isOpen: false,
      connectedToInjectedWeb3: false,
      currentTxIndex: -1
    };
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let args: any = {};
    const convertedInputs = this.inputs.map((input: any, index: any) => {
      if (input.type === 'bytes32') {
        return this.utils.toHex(this.state.contractFunctions[input.name])
      } else if (input.type === 'uint256') {
        return this.utils.toWei(this.state.contractFunctions[input.name], 'ether'); // all number fields are ETH  fields.
      }
      return this.state.contractFunctions[input.name];
    });

    // todo: if foreclosed, price should default to zero.
    if (this.state.contractFunctions.value) {
      const artworkPrice = new this.utils.BN(this.props.contracts.VitalikSteward['price']['0x0'].value);
      args.value = new this.utils.BN(this.utils.toWei(this.state.contractFunctions.value, 'ether')).add(artworkPrice);
    }

    const currentTxIndex = (args) ?
      this.contracts.VitalikSteward.methods[
        'buy'
      ].cacheSend(...convertedInputs, args)
      : this.contracts.VitalikSteward.methods[
        'buy'
      ].cacheSend(...convertedInputs)

    this.setState((state: any, props: any) => ({
      ...state,
      currentTxIndex
    }))
  }

  componentWillReceiveProps(nextProps: any) {
    const { transactions, transactionStack } = this.props;

    const didTransactionsChange = transactions !== nextProps.transactions;
    const didTransactionStackChange = transactionStack !== nextProps.transactionStack;
  }

  handleInputChange(event: any) {
    this.setState({
      ...this.state,
      contractFunctions: {
        ...this.state.contractFunctions, [event.target.name]: event.target.value
      }
    })
  }

  translateType(type: any) {
    switch (true) {
      case /^uint/.test(type):
        return "number";
      case /^string/.test(type) || /^bytes/.test(type):
        return "text";
      case /^bool/.test(type):
        return "checkbox";
      default:
        return "text";
    }
  }

  closeModal = (e: any) => {
    e.preventDefault()
    this.setState((state: any, props: any) => ({
      ...state,
      isOpen: false,
      currentTxIndex: -1,
    }))
  }

  openModal = async (e: any) => {
    e.preventDefault()
    this.setState((state: any, props: any) => ({
      ...state,
      isOpen: true,
      currentTxIndex: -1,
    }))

    const connectedToInjectedWeb3 = await web3ProvideSwitcher.switchToInjectedWeb3()

    this.setState((state: any, props: any) => ({
      ...state,
      connectedToInjectedWeb3,
    }))
  }

  render() {
    const valueLabel = "Your Initial Deposit";
    const { transactions, transactionStack } = this.props
    const { currentTxIndex } = this.state
    let transactionStatus = 'Submitting transaction to the Ethereum Network.'
    let txHash = ''
    let txComplete = false
    if (!!transactionStack[this.state.currentTxIndex]) {
      const tempTxHash = transactionStack[this.state.currentTxIndex]
      if (!!transactions[tempTxHash]) {
        txHash = transactionStack[this.state.currentTxIndex]
        switch (transactions[txHash].status) {
          case 'pending':
            transactionStatus = 'Transaction being processed by the Ethereum Network.'
            break
          case 'success':
            txComplete = true
            transactionStatus = 'Transaction is complete.'
            break
        }
      }
    }

    const transactionProcessing = currentTxIndex !== -1
    return (
      <React.Fragment>
        <Button mainColor="#6bad3e" onClick={this.openModal}>Buy</Button>

        <Modal isOpen={this.state.isOpen}>
          <Card width={'420px'} p={0}>
            <Button.Text
              icononly
              icon={'Close'}
              color={'moon-gray'}
              position={'absolute'}
              top={0}
              right={0}
              mt={3}
              mr={3}
              onClick={this.closeModal}
            />
            {this.state.connectedToInjectedWeb3 ?

              <Box p={4} mb={3}>{
                transactionProcessing ?
                  <Fragment>
                    <Heading.h3>Processing Transaction</Heading.h3>
                    <p>{transactionStatus}</p>
                    {!!txHash && <a href={'https://etherscan.io/tx/' + txHash} target="_blank">View transaction on Ethersan</a>}
                    {!txComplete && <Loader color="red" size="80px" />}
                  </Fragment>
                  :
                  <Fragment>
                    <Heading.h3>Purchase</Heading.h3>
                    <Text>
                      Enter the desired values for the transaction.
                    </Text>
                    <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                      <Input
                        key='_newPrice'
                        type='number'
                        name='_newPrice'
                        value={this.state.contractFunctions['_newPrice']}
                        placeholder={"Your Initial Sale Price"}
                        onChange={this.handleInputChange}
                        style={{ width: '100%' }}
                        startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
                      />
                      <Fragment>
                        <br />
                        <Input
                          key={valueLabel}
                          type='number'
                          name='value'
                          value={this.state.contractFunctions[valueLabel]}
                          placeholder={valueLabel}
                          onChange={this.handleInputChange}
                          style={{ width: '100%' }}
                          startAdornment={<InputAdornment position="start">ETH</InputAdornment>} />
                        <br />
                        <br />
                      </Fragment>
                    </form>
                    <TokenOverview />
                  </Fragment>}
              </Box>
              :
              <Box p={4} mb={3}>
                <Heading.h3>NOTICE</Heading.h3>
                <Text>
                  Unable to connect to metamask, so unable to sign transactions.
                </Text>
              </Box>
            }
            {(!transactionProcessing) && <Flex px={4} py={3} borderTop={1} borderColor={'#E8E8E8'} justifyContent={'flex-end'}>
              {/* <Button.Outline>Cancel</Button.Outline> In the future this could be for resetting the values or something*/}
              <Button
                mainColor="#6bad3e"
                ml={3}
                onClick={this.handleSubmit}
              >Buy Vitalik</Button>
            </Flex>}
          </Card>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    contracts: state.contracts,
    transactions: state.transactions,
    transactionStack: state.transactionStack
  }
}

export default drizzleConnect(BuyModal, mapStateToProps);
