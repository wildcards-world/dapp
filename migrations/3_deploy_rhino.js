/* globals artifacts */
var Rhino1 = artifacts.require("./Rhino1.sol");
var Rhino2 = artifacts.require("./Rhino2.sol");
var Rhino3 = artifacts.require("./Rhino3.sol");
var Rhino4 = artifacts.require("./Rhino4.sol");
var Rhino5 = artifacts.require("./Rhino5.sol");
var Rhino6 = artifacts.require("./Rhino6.sol");
var Rhino7 = artifacts.require("./Rhino7.sol");
var Rhino8 = artifacts.require("./Rhino8.sol");
var Rhino9 = artifacts.require("./Rhino9.sol");
var Rhino10 = artifacts.require("./Rhino10.sol");

var Artwork = artifacts.require("./ERC721Full.sol");

const deploymentAccount =  '0x09b67b74fb050a35304a6447dfa41b1a9d6afa3a'; //[0] address from mnemonic
const artistAccount = '0x0CaCC6104D8Cd9d7b2850b4f35c65C1eCDEECe03'; // artist account [on mainnet & rinkeby]

module.exports = function(deployer, network, accounts) {
  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino1, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino1, accounts[0], deployedArtwork.address);
    });
  }

  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino2, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino2, accounts[0], deployedArtwork.address);
    });
  }

  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino3, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino3, accounts[0], deployedArtwork.address);
    });
  }

  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino4, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino4, accounts[0], deployedArtwork.address);
    });
  }


  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino5, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino5, accounts[0], deployedArtwork.address);
    });
  }

  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino6, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino6, accounts[0], deployedArtwork.address);
    });
  }

  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino7, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino7, accounts[0], deployedArtwork.address);
    });
  }

  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino8, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino8, accounts[0], deployedArtwork.address);
    });
  }

  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino9, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino9, accounts[0], deployedArtwork.address);
    });
  }
  if(network === "rinkeby" || network === "rinkeby-fork" || network === "mainnet" || network === "mainnet-fork") {
    // deploy with mnemonic provider
    deployer.deploy(Artwork, "This Artwork Is Always OnSale", "TAIAOS").then((deployedArtwork) => {
      console.log(deployedArtwork.address);
      return deployer.deploy(Rhino10, artistAccount, deployedArtwork.address);
    });
  } else {
    // development deploy
    deployer.deploy(Artwork, "ThisArtworkIsAlwaysOnSale", "TAIAOS").then((deployedArtwork) => {
      return deployer.deploy(Rhino10, accounts[0], deployedArtwork.address);
    });
  }
};