import ArtSteward from "./contracts/ArtSteward.json";
import ERC721Full from "./contracts/ERC721Full.json";
import Rhino from "./contracts/Rhino.json";
import Rhino4 from "./contracts/Rhino4.json";


// todo: read env var for fallback
const fallbackUrl = "wss://mainnet.infura.io/ws/v3/e811479f4c414e219e7673b6671c2aba";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: fallbackUrl,
    },
  },
  contracts: [
    Rhino,
    Rhino4,
    ArtSteward, 
    ERC721Full
  ],
  syncAlways: true,
  polls: {
    accounts: 1500,
  },
};

export default options;
