import VitalikSteward from "./contracts/VitalikSteward.json"
import ERC721Full from "./contracts/ERC721Full.json"
import web3ProvideSwitcher from "./web3ProvideSwitcher"

// todo: read env var for fallback
const fallbackUrl = "wss://mainnet.infura.io/ws/v3/e811479f4c414e219e7673b6671c2aba";
const switchableWeb3 = web3ProvideSwitcher.createSwitchableWeb3()

interface Options {
  web3: any
  contracts: any[]
  syncAlways: boolean
  polls: any
}
const options: Options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: fallbackUrl,
    },
    customProvider: switchableWeb3,
    // Repeating this because there seems to be some kind of bug somewhere where web3.web3 is used instead
    web3: {
      block: false,
      fallback: {
        type: "ws",
        url: fallbackUrl,
      },
      customProvider: switchableWeb3,
    },
  },
  contracts: [
    VitalikSteward,
    ERC721Full
  ],
  syncAlways: true,
  polls: {
    accounts: 1500,
  },
};

export default options;
