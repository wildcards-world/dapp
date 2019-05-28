import Vitalik from "./contracts/Vitalik.json";
import ERC721Full from "./contracts/ERC721Full.json";

// todo: read env var for fallback
const fallbackUrl = "wss://mainnet.infura.io/ws/v3/e811479f4c414e219e7673b6671c2aba";

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
  },
  contracts: [
    Vitalik,
    ERC721Full
  ],
  syncAlways: true,
  polls: {
    accounts: 1500,
  },
};

export default options;
