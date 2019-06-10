import { drizzleConnect } from "drizzle-react";
import React, { Component, Fragment } from "react";
import TokenOverview from "./TokenOverview";
import OfflineContainer from "./Offline"

export default () => (
  <Fragment>
    <OfflineContainer>
      <div>
        <TokenOverview />
      </div>
    </OfflineContainer>
  </Fragment>
)
