const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'dumb gown nose volume total father license lady empower snow body tag'; // 12 word mnemonic 
const mainnetProviderUrl = 'https://mainnet.infura.io/v3/e811479f4c414e219e7673b6671c2aba';
const rinkebyProviderUrl = 'https://rinkeby.infura.io/v3/e811479f4c414e219e7673b6671c2aba';
const goerlyProviderUrl = 'https://goerli.infura.io/v3/a349f12fe9ac4fdb995f44e04648f7c5';
const blockchainNodeHost = process.env.BLOCKCHAIN_NODE_HOST || 'localhost'

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  plugins: ["truffle-security"],
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    // mainnet: {
    //   network_id: 1,
    //   provider: new HDWalletProvider(mnemonic, mainnetProviderUrl, 0),
    //   gas: 4700000,
    //   gasPrice: 5000000000, // 5 gwei
    //   skipDryRun: true,
    // },
    // rinkeby: {
    //   network_id: 4,
    //   provider: new HDWalletProvider(mnemonic, rinkebyProviderUrl, 0),
    //   gas: 4700000,
    //   gasPrice: 10000000000, // 10 gwei
    //   skipDryRun: true,
    // },
    goerly: {
      network_id: 5,
      provider: new HDWalletProvider(mnemonic, goerlyProviderUrl, 0),
      gas: 4700000,
      gasPrice: 10000000000, // 10 gwei
      skipDryRun: true,
    },
    development: {
      host: blockchainNodeHost,     // Localhost (default: none)
      test: (() => console.log({ blockchainNodeHost }))(),
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gasPrice: 1000000000, // 1 gwei
    },
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 5, //in gwei
    },
  },
};
