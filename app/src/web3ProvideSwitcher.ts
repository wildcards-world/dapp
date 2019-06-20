import HDWalletProvider from "truffle-hdwallet-provider"
import Web3 from "web3"

const getInjectedWeb3 = async () => {

  if (window.ethereum) {
    const { ethereum } = window
    try {
      await ethereum.enable()
      return ethereum
    } catch (error) {
      // User denied account access...
      console.log(error)
    }
  } else if (typeof (<any>window).web3 !== 'undefined') {
    console.log('we have the window web3')
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // Use Mist/MetaMask's provider.
    const { currentProvider } = new Web3((<any>window).web3.currentProvider)

    return currentProvider
  } else {
    // Out of web3 options; throw.
    throw new Error('Cannot find injected web3 or valid fallback.')
  }
}
const getInjectedWeb3NoLoad = () => {

  if (window.ethereum) {
    const { ethereum } = window
    try {
      return ethereum
    } catch (error) {
      // User denied account access...
      console.log(error)
    }
  } else if (typeof (<any>window).web3 !== 'undefined') {
    console.log('we have the window web3')
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // Use Mist/MetaMask's provider.
    const { currentProvider } = new Web3((<any>window).web3.currentProvider)

    return currentProvider
  } else {
    // Out of web3 options; throw.
    throw new Error('Cannot find injected web3 or valid fallback.')
  }
}
class Web3ProviderSwitcher {

  public static instance: Web3ProviderSwitcher
  public injectedWeb3: any = null
  public defaultWeb3: any
  public usingInjectedWeb3: boolean = false

  constructor() {
    if (Web3ProviderSwitcher.instance) { return Web3ProviderSwitcher.instance }
    Web3ProviderSwitcher.instance = this

    this.defaultWeb3 = getInjectedWeb3NoLoad()
  }

  public async switchToInjectedWeb3() {
    try {
      const web3 = await getInjectedWeb3()
      this.injectedWeb3 = web3
      this.usingInjectedWeb3 = true
    } catch (e) {
      console.log(e)
    }

    return this.usingInjectedWeb3
  }

  public createSwitchableWeb3() {
    const web3RequestHandler = {
      get: (obj: any, prop: string) =>
        this.usingInjectedWeb3 ? this.injectedWeb3[prop] : this.defaultWeb3[prop]
    }

    return new Proxy({}, web3RequestHandler)
  }
}

export default new Web3ProviderSwitcher()
