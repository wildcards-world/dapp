import { drizzleConnect } from "drizzle-react";
import PropTypes from "prop-types";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { Component, Fragment } from "react";
import TokenOverview from "./TokenOverview"
import OfflineContainer from "./Offline"
import { Button, Modal, Card, Box, Heading, Text, Flex } from 'rimble-ui'
import { any } from "prop-types";
import BuyModal from './BuyModal'

class Dapp extends Component<any, any> {

  constructor(props: any, context: any) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <OfflineContainer>
          <div>
            <BuyModal />
            <TokenOverview />
          </div>
        </OfflineContainer>
      </Fragment >
    );
  }
}

export default Dapp;

