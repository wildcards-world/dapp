##  ETHCapetown first hackaton of Africa: Team "Nargile Bebe"'s project for aiding wildlife and endangered species through Blockchain

An endangered species project that showcases a digital animal that is always on sale through Harberger Taxed property rights. The owner of the animal always has to set a sale price, upon which it can be bought by anyone at any time. A continuous tax is levied as patronage towards the charity calculated on the owner's price they set. If the deposit does not cover the patronage owed, the smart contract steward can foreclose the animal and take back ownership.

### Team Members
[Jason](https://github.com/JasoonS)
[Şen](https://github.com/shenferhat) & 
[Denham](https://github.com/DenhamPreen) & 
[Jonjon](http://github.com/moose-code) & 
[Sean](https://github.com/stentonian) 


### Tech

This is a work-in-progress.

- Built on Ethereum using OpenZeppelin's ERC721 (modified to only be transferable through a steward contract).
- The animals follows the ERC721 NFT metadata standard and is viewable in any compatible browser (eg, Coinbase' Wallet or Status.im).
- It uses Drizzle Box as base for front-end (using legacy react API).
- Components from drizzle-react-components were forked.

### Vitalik.sol

This smart contract is responsible for managing ownership over the gorillas as an example. It takes in a deposit and sets the price for the animal (by the owner). Over time, it collects patronage towards the charity and forecloses the animal in case the owner can't pay anymore.

This is feature-complete atm, along with a test suite.

### Testing

`npm run chain`  
then
`truffle test`

The Gas Reporter is disable (since it is slower). Enable gas reporter in truffle config to check.

The test may sometimes fail due to split-second changes in when the test is run due to patronage incrementing per second.
Just re-run.

NOTE: It costs ~$0.12 tx fee at 5 gwei gas price & 133 usd/eth to buy. 

### Front-End

The front-end is forked from drizzle-box. A simple front-end allows users to buy the animals, set the price and manage their patronage (deposit & fees). This

### Running 

After installing packages, main directory:

`npm run chain`  
or  
`npm run moving_chain`  

This creates a local ganache-cli instance. The latter includes auto-mining of blocks to showcase the patronage owed increasing on the front-end.

`truffle migrate`

This deploys the ERC721-artwork/nft & the Rhino.

`cd app`  
`npm run start`  

### This is originally inspired by Simon

https://github.com/simondlr/thisartworkisalwaysonsale

### Future  Improvements

- ENS Etherenum Name Service
- NuCrypto
- Unicef
- DAI (and ERC20) support.
- Generic collector. Would be nice to have this collector be generic for other Harberger Property rights in the future.
- Incentivize a keeper to foreclose [small fee].
- Experiment with other tx formats to pay patronage vs requiring a deposit.
- Improve licensing.

### License

Code License:
MIT
