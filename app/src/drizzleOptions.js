import ArtSteward from "./contracts/ArtSteward.json";
import ERC721Full from "./contracts/ERC721Full.json";
import Rhino1 from "./contracts/Rhino1.json";
import Rhino2 from "./contracts/Rhino2.json";
import Rhino3 from "./contracts/Rhino3.json";
import Rhino4 from "./contracts/Rhino4.json";
import Rhino5 from "./contracts/Rhino5.json";
import Rhino6 from "./contracts/Rhino6.json";
import Rhino7 from "./contracts/Rhino7.json";
import Rhino8 from "./contracts/Rhino8.json";
import Rhino9 from "./contracts/Rhino9.json";
import Rhino10 from "./contracts/Rhino10.json";


//import Rhino4 from "./contracts/Rhino4.json";


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
    Rhino1,
    Rhino2,
    Rhino3,
    Rhino4,
    Rhino5,
    Rhino6,
    Rhino7,
    Rhino8,
    Rhino9,
    Rhino10,
    ArtSteward, 
    ERC721Full
  ],
  syncAlways: true,
  polls: {
    accounts: 1500,
  },
};

export default options;
