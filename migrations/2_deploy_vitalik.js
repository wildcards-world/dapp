/* globals artifacts */
var Vitalik = artifacts.require("./Vitalik.sol");
var Artwork = artifacts.require("./ERC721Full.sol");

const artistAccount = '0x0000000000000000000000000000000000000000'; // need to fix

module.exports = function (deployer, network, accounts) {
  if (network === 'goerly' || network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Vitalik Is Always OnSale", "TVIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Vitalik, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisVitalikIsAlwaysOnSale", "TVIAOS").then((deployedArtwork) => {
      return deployer.deploy(Vitalik, accounts[0], deployedArtwork.address);
    });
  }

};
