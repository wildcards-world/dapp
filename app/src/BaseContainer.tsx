import BaseComponent from "./components/BaseComponent";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = (state: any) => {
  return {
    accounts: state.accounts,
    ERC721Full: state.contracts.ERC721Full,
    Vitalik: state.contracts.Vitalik,
    drizzleStatus: state.drizzleStatus,
  };
};

const BaseContainer = drizzleConnect(BaseComponent, mapStateToProps);

export default BaseContainer;
