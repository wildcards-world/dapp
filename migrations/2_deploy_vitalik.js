/* globals artifacts */
var VitalikSteward = artifacts.require("./VitalikSteward.sol");
var Vitalik = artifacts.require("./ERC721Full.sol");

const organization = '0x3eA1ecB8775a37fb797bb79f6C419176F15E35D4';

module.exports = function (deployer, network, accounts) {
  if (network === 'goerly' || network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Vitalik, "This Vitalik Is Always OnSale", "TVIAOS").then((deployedVitalik) => {
      console.log(deployedVitalik.address);
      return deployer.deploy(VitalikSteward, organization, deployedVitalik.address);
    });
  } else {
    // development deploy
    deployer.deploy(Vitalik, "ThisVitalikIsAlwaysOnSale", "TVIAOS").then((deployedVitalik) => {
      return deployer.deploy(VitalikSteward, accounts[0], deployedVitalik.address);
    });
  }

};
