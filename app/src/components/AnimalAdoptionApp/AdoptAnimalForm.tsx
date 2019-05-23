import { drizzleConnect } from "drizzle-react";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
// import Button from '@material-ui/core/Button';
import { Card, Button, Modal, TextButton, Box, Flex, OutlineButton, Text, Heading, Icon } from 'rimble-ui'

/*
Edited from drizzle react components, ContractFrom.
Overkill. Needs to be refactored to smaller scope.
*/

/*
Update: Edited again from This Artwork is always on sale. For Hackathon. 
Needs to be refactored to smaller smaller scope. Down the rabbit hole.
 */

class BuyForm extends Component<{ contract: any, contracts: any, method: any, sendArgs: any, valueLabel: any, labels: any }, {}> {
  contracts: any
  utils: any
  inputs: any[]
  state: any

  constructor(props: any, context: any) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    let initialState: any = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs;

        for (var j = 0; j < this.inputs.length; j++) {
          initialState[this.inputs[j].name] = "";
        }

        break;
      }
    }

    this.state = initialState;
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let args = this.props.sendArgs;
    const convertedInputs = this.inputs.map((input, index) => {
      if (input.type === 'bytes32') {
        return this.utils.toHex(this.state[input.name])
      } else if (input.type === 'uint256') {
        return this.utils.toWei(this.state[input.name], 'ether'); // all number fields are ETH  fields.
      }
      return this.state[input.name];
    });

    // todo: if foreclosed, price should default to zero.
    if (this.state.value) {
      console.log(this.props.contracts[this.props.contract]['price']['0x0'].value);
      const artworkPrice = new this.utils.BN(this.props.contracts[this.props.contract]['price']['0x0'].value);
      args.value = new this.utils.BN(this.utils.toWei(this.state.value, 'ether')).add(artworkPrice);
    }
    if (args) {
      return this.contracts[this.props.contract].methods[
        this.props.method
      ].cacheSend(...convertedInputs, args);
    }

    return this.contracts[this.props.contract].methods[
      this.props.method
    ].cacheSend(...convertedInputs);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  render() {
    const valueLabel = this.props.valueLabel;
    return (
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
        {this.inputs.map((input, index) => {
          var inputType = this.translateType(input.type);
          var inputLabel = this.props.labels
            ? this.props.labels[index]
            : input.name;
          // check if input type is struct and if so loop out struct fields as well
          return (
            <span>

              <Input
                style={{ width: '100%' }}
                key={input.name}
                type={inputType}
                name={input.name}
                value={this.state[input.name]}
                placeholder={inputLabel}
                onChange={this.handleInputChange}
                startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
              />
            </span>
          );
        })}
        {valueLabel &&
          <Fragment>
            <br />
            <span>

              <Input
                style={{ width: '100%' }}
                key={valueLabel}
                type='number'
                name='value'
                value={this.state[valueLabel]}
                placeholder={valueLabel}
                onChange={this.handleInputChange}
                startAdornment={<InputAdornment position="start">ETH</InputAdornment>} />
            </span>
            <br />
            <br />
          </Fragment>
        }
        <Flex px={4} py={3} borderTop={1} borderColor={'#E8E8E8'} justifyContent={'flex-end'}>
          <OutlineButton>Cancel</OutlineButton>
          <Button
            ml={3}
            variant="contained"
            key="submit"
            className="pure-button"
            type="button"
            onClick={this.handleSubmit}
            fullWidth
          >
            Adopt Rhino
        </Button>
        </Flex>
      </form>
    );
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

export default drizzleConnect(BuyForm, mapStateToProps);
