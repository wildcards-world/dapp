import { drizzleConnect } from "drizzle-react";
import PropTypes from "prop-types";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { Component, Fragment } from "react";
import { Button, Modal, Card, Box, Heading, Text, Flex } from 'rimble-ui'
import web3ProvideSwitcher from "../web3ProvideSwitcher"

class BuyModal extends Component<any, any> {
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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;

    // Get the contract ABI, if it is undefined return an empty array
    const abi = (!!this.contracts.Vitalik) ? this.contracts.Vitalik.abi : [];

    this.inputs = [];
    var initialState: any = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === 'buy') {
        this.inputs = abi[i].inputs;

        for (var j = 0; j < this.inputs.length; j++) {
          initialState[this.inputs[j].name] = "";
        }

        break;
      }
    }

    this.state = {
      ...initialState,
      isOpen: false,
    };
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let args: any = {};
    const convertedInputs = this.inputs.map((input: any, index: any) => {
      if (input.type === 'bytes32') {
        return this.utils.toHex(this.state[input.name])
      } else if (input.type === 'uint256') {
        return this.utils.toWei(this.state[input.name], 'ether'); // all number fields are ETH  fields.
      }
      return this.state[input.name];
    });

    // todo: if foreclosed, price should default to zero.
    if (this.state.value) {
      const artworkPrice = new this.utils.BN(this.props.contracts.Vitalik['price']['0x0'].value);
      args.value = new this.utils.BN(this.utils.toWei(this.state.value, 'ether')).add(artworkPrice);
    }

    this.setState({
      isOpen: false
    })

    if (args) {
      return this.contracts.Vitalik.methods[
        'buy'
      ].cacheSend(...convertedInputs, args);
    }

    return this.contracts.Vitalik.methods[
      'buy'
    ].cacheSend(...convertedInputs);
  }

  handleInputChange(event: any) {
    this.setState({ [event.target.name]: event.target.value });
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
      isOpen: false
    }))
  }

  openModal = async (e: any) => {
    e.preventDefault()
    await web3ProvideSwitcher.switchToInjectedWeb3()

    this.setState((state: any, props: any) => ({
      isOpen: true
    }))
  }

  render() {
    const valueLabel = "Your Initial Deposit";
    return (
      <React.Fragment>
        <Button onClick={this.openModal}>Open Modal</Button>

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
            <Box p={4} mb={3}>
              <Heading.h3>Purchase</Heading.h3>
              <Text>
                Enter the desired values for the transaction.
              </Text>
              <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                {this.inputs.map((input: any, index: any) => {
                  var inputType = this.translateType(input.type);
                  var inputLabel = ["Your Initial Sale Price"]
                    ? ["Your Initial Sale Price"][index]
                    : input.name;
                  // check if input type is struct and if so loop out struct fields as well
                  return (
                    <Input
                      key={input.name}
                      type={inputType}
                      name={input.name}
                      value={this.state[input.name]}
                      placeholder={inputLabel}
                      onChange={this.handleInputChange}
                      startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
                    />
                  );
                })}
                {valueLabel &&
                  <Fragment>
                    <br />
                    <Input
                      key={valueLabel}
                      type='number'
                      name='value'
                      value={this.state[valueLabel]}
                      placeholder={valueLabel}
                      onChange={this.handleInputChange}
                      startAdornment={<InputAdornment position="start">ETH</InputAdornment>} />
                    <br />
                    <br />
                  </Fragment>
                }
              </form>
            </Box>
            <Flex px={4} py={3} borderTop={1} borderColor={'#E8E8E8'} justifyContent={'flex-end'}>
              {/* <Button.Outline>Cancel</Button.Outline> In the future this could be for resetting the values or something*/}
              <Button
                ml={3}
                onClick={this.handleSubmit}
              >Buy Vitalik</Button>
            </Flex>
          </Card>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    contracts: state.contracts,
  }
}

export default drizzleConnect(BuyModal, mapStateToProps);
